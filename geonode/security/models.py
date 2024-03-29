# -*- coding: utf-8 -*-
#########################################################################
#
# Copyright (C) 2017 OSGeo
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.
#
#########################################################################
import logging

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from geonode.groups.models import GroupProfile
from guardian.shortcuts import assign_perm, get_groups_with_perms

from .utils import (get_users_with_perms,
                    set_geofence_all,
                    set_geofence_owner,
                    set_geofence_group,
                    set_owner_permissions,
                    remove_object_permissions)

logger = logging.getLogger("geonode.security.models")

ADMIN_PERMISSIONS = [
    'view_resourcebase',
    'download_resourcebase',
    'change_resourcebase_metadata',
    'change_resourcebase',
    'delete_resourcebase',
    'change_resourcebase_permissions',
    'publish_resourcebase',
]

LAYER_ADMIN_PERMISSIONS = [
    'change_layer_data',
    'change_layer_style'
]

GEOFENCE_SECURITY_ENABLED = settings.OGC_SERVER['default'].get(
    "GEOFENCE_SECURITY_ENABLED", False)


class PermissionLevelError(Exception):
    pass


class PermissionLevelMixin(object):

    """
    Mixin for adding "Permission Level" methods
    to a model class -- eg role systems where a
    user has exactly one assigned role with respect to
    an object representing an "access level"
    """

    def get_all_level_info(self):

        resource = self.get_self_resource()
        users = get_users_with_perms(resource)
        groups = get_groups_with_perms(resource,
                                       attach_perms=True)
        if groups:
            for group in groups:
                try:
                    group_profile = GroupProfile.objects.get(slug=group.name)
                    managers = group_profile.get_managers()
                    if managers:
                        for manager in managers:
                            if manager not in users and not manager.is_superuser:
                                for perm in ADMIN_PERMISSIONS:
                                    assign_perm(perm, manager, resource)
                                users[manager] = ADMIN_PERMISSIONS
                except GroupProfile.DoesNotExist:
                    pass
        info = {
            'users': users,
            'groups': groups}

        # TODO very hugly here, but isn't huglier
        # to set layer permissions to resource base?
        if hasattr(self, "layer"):
            info_layer = {
                'users': get_users_with_perms(
                    self.layer),
                'groups': get_groups_with_perms(
                    self.layer,
                    attach_perms=True)}

            for user in info_layer['users']:
                permissions = []
                if user in info['users']:
                    permissions = info['users'][user]
                else:
                    info['users'][user] = []

                for perm in info_layer['users'][user]:
                    if perm not in permissions:
                        permissions.append(perm)

            for group in info_layer['groups']:
                permissions = []
                if group in info['groups']:
                    permissions = info['groups'][group]
                else:
                    info['groups'][group] = []
                for perm in info_layer['groups'][group]:
                    if perm not in permissions:
                        permissions.append(perm)

        return info

    def get_self_resource(self):
        return self.resourcebase_ptr if hasattr(
            self,
            'resourcebase_ptr_id') else self

    def set_default_permissions(self):
        """
        Remove all the permissions except for the owner and assign the
        view permission to the anonymous group
        """
        remove_object_permissions(self)

        # default permissions for anonymous users
        anonymous_group, created = Group.objects.get_or_create(name='anonymous')

		# removed in DRR
        # if not anonymous_group:
        #     raise Exception("Could not acquire 'anonymous' Group.")

        # default permissions for resource owner
        set_owner_permissions(self)

        anonymous_can_view = settings.DEFAULT_ANONYMOUS_VIEW_PERMISSION
        if anonymous_can_view:
            assign_perm('view_resourcebase',
                        anonymous_group, self.get_self_resource())

        if self.__class__.__name__ == 'Layer':
            if anonymous_can_view and GEOFENCE_SECURITY_ENABLED:
                set_geofence_all(self)
            # only for layer owner
            assign_perm('change_layer_data', self.owner, self)
            assign_perm('change_layer_style', self.owner, self)

        if settings.DEFAULT_ANONYMOUS_DOWNLOAD_PERMISSION:
            assign_perm('download_resourcebase',
                        anonymous_group, self.get_self_resource())

    def set_permissions(self, perm_spec):
        """
        Sets an object's the permission levels based on the perm_spec JSON.


        the mapping looks like:
        {
            'users': {
                'AnonymousUser': ['view'],
                <username>: ['perm1','perm2','perm3'],
                <username2>: ['perm1','perm2','perm3']
                ...
            }
            'groups': [
                <groupname>: ['perm1','perm2','perm3'],
                <groupname2>: ['perm1','perm2','perm3'],
                ...
                ]
        }
        """

        remove_object_permissions(self)

        # default permissions for resource owner
        set_owner_permissions(self)

        if 'users' in perm_spec and "AnonymousUser" in perm_spec['users']:
            anonymous_group = Group.objects.get(name='anonymous')
            for perm in perm_spec['users']['AnonymousUser']:
                if self.polymorphic_ctype.name == 'layer' and perm in ('change_layer_data', 'change_layer_style',
                                                                       'add_layer', 'change_layer', 'delete_layer',):
                    assign_perm(perm, anonymous_group, self.layer)
                else:
                    assign_perm(perm, anonymous_group, self.get_self_resource())

        if 'users' in perm_spec:
            for user, perms in perm_spec['users'].items():
                user = get_user_model().objects.get(username=user)
                # Set the GeoFence Owner Rules
                has_view_perms = ('view_resourcebase' in perms)
                has_download_perms = ('download_resourcebase' in perms)
                geofence_user = str(user)
                if "AnonymousUser" in geofence_user:
                    geofence_user = None
                if GEOFENCE_SECURITY_ENABLED:
                    set_geofence_owner(self, username=geofence_user,
                                       view_perms=has_view_perms,
                                       download_perms=has_download_perms)

                for perm in perms:
                    if self.polymorphic_ctype.name == 'layer' and perm in (
                            'change_layer_data', 'change_layer_style',
                            'add_layer', 'change_layer', 'delete_layer',):
                        assign_perm(perm, user, self.layer)
                    else:
                        assign_perm(perm, user, self.get_self_resource())

        if 'groups' in perm_spec:
            for group, perms in perm_spec['groups'].items():
                group = Group.objects.get(name=group)
                # Set the GeoFence Owner Rules
                has_view_perms = ('view_resourcebase' in perms)
                has_download_perms = ('download_resourcebase' in perms)
                if GEOFENCE_SECURITY_ENABLED:
                    set_geofence_group(
                        self, str(group),
                        view_perms=has_view_perms,
                        download_perms=has_download_perms
                    )

                for perm in perms:
                    if self.polymorphic_ctype.name == 'layer' and perm in (
                            'change_layer_data', 'change_layer_style',
                            'add_layer', 'change_layer', 'delete_layer',):
                        assign_perm(perm, group, self.layer)
                    else:
                        assign_perm(perm, group, self.get_self_resource())
