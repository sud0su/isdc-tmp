# -*- coding: utf-8 -*-
#
#
# Copyright (C) 2018 OSGeo
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
#

import django
from django.conf.urls import include, url
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from geonode.sitemap import LayerSitemap, MapSitemap
from django.views.generic import TemplateView
from django.contrib import admin
from django.conf.urls.i18n import i18n_patterns
from django.views.i18n import javascript_catalog
from django.contrib.sitemaps.views import sitemap

import geonode.proxy.urls
from . import views

from geonode.api.urls import api
from geonode.api.views import verify_token, roles, users, admin_role

from geonode import geoserver, qgis_server  # noqa
from geonode.utils import check_ogc_backend

from autocomplete_light.registry import autodiscover
from tastypie.api import Api
import importlib
import pkgutil

# from flood.urls import api as api_flood

# Setup Django Admin
autodiscover()

admin.autodiscover()

js_info_dict = {
	'domain': 'djangojs',
	'packages': ('geonode',)
}

sitemaps = {
	"layer": LayerSitemap,
	"map": MapSitemap
}

urlpatterns_isdc = [

	# url(r'', include('uploadpdf.urls'))

	# Static pages
	url(r'^/?$', TemplateView.as_view(template_name='index.html'), name='home'),
	url(r'^help/$', TemplateView.as_view(template_name='help.html'), name='help'),
	url(r'^developer/$', TemplateView.as_view(template_name='developer.html'), name='developer'),
	url(r'^about/$', TemplateView.as_view(template_name='about.html'), name='about'),
	url(r'^disclaimer/$', TemplateView.as_view(template_name='disclaimer.html'), name='disclaimer'),
	url(r'^partners/$', TemplateView.as_view(template_name='partners.html'), name='partners'),
	url(r'^video/$', TemplateView.as_view(template_name='video.html'), name='video'),
	url(r'^training/$', TemplateView.as_view(template_name='training.html'), name='training'),
	url(r'^documentation/$', TemplateView.as_view(template_name='documentation.html'), name='documentation'),
	
	# url(r'^dashboard/', include('dashboard.urls')),
	  
	# url(r'', include('geodb.urls')),
	# url(r'', include('flood.urls')),
	# url(r'', include('avalanche.urls')),
	# url(r'', include('accessibility.urls')),
	# url(r'', include('earthquake.urls')),
	# url(r'', include('landslide.urls')),
	# url(r'', include('securityincident.urls')),
	# url(r'', include('weather.urls')),
	# url(r'', include('climate.urls')),
	# url(r'', include('drought.urls')),
	
	# url(r'^userstatistics$', 'userstatistics.views.userstatistics', name='userstatistics'),
	
	]

# ISDC apps urls is imported using this loop
getoverviewmaps_api = Api(api_name='getoverviewmaps')
for app in settings.ISDC_BASE_APPS + settings.ISDC_ADDITIONAL_APPS + settings.DASHBOARD_PAGE_MODULES:

	# avoid using try-except ImportError to avoid catching untargeted ImportError
	loader = pkgutil.find_loader(app+'.urls')
	if loader:
		urlpatterns_isdc.append(url(r'', include(app+'.urls')))
		
		# import GETOVERVIEWMAPS_APIOBJ from every app and 
		# register using single Api object 
		# to make api root url scheme (http://localhost:8000/api/getoverviewmaps/) return complete api members
		module = importlib.import_module(app+'.urls')
		if hasattr(module, 'GETOVERVIEWMAPS_APIOBJ'):
			for apiobj in module.GETOVERVIEWMAPS_APIOBJ:
				getoverviewmaps_api.register(apiobj)

urlpatterns_isdc += [url(r'^api/', include(getoverviewmaps_api.urls)),]
  
urlpatterns = [  # '',
	url(r'^', include(urlpatterns_isdc, namespace=None)),

	# Static pages
	url(r'^$',
		TemplateView.as_view(template_name='index.html'),
		name='home'),
	url(r'^help/$',
		TemplateView.as_view(template_name='help.html'),
		name='help'),
	url(r'^developer/$',
		TemplateView.as_view(
		template_name='developer.html'),
		name='developer'),
	url(r'^about/$',
		TemplateView.as_view(template_name='about.html'),
		name='about'),

	# Layer views
	url(r'^layers/', include('geonode.layers.urls')),

	# Map views
	url(r'^maps/', include('geonode.maps.urls')),

	# Catalogue views
	url(r'^catalogue/', include('geonode.catalogue.urls')),

	# data.json
	url(r'^data.json$',
		geonode.catalogue.views.data_json,
		name='data_json'),

	# ident
	url(r'^ident.json$',
		views.ident_json,
		name='ident_json'),

	# h keywords
	url(r'^h_keywords_api$',
		views.h_keywords,
		name='h_keywords_api'),

	# Search views
	url(r'^search/$',
		TemplateView.as_view(
		template_name='search/search.html'),
		name='search'),

	# Social views
	url(r"^account/", include("allauth.urls")),
	url(r'^invitations/', include(
		'geonode.invitations.urls', namespace='geonode.invitations')),
	url(r'^people/', include('geonode.people.urls')),
	url(r'^avatar/', include('avatar.urls')),
	# (r'^comments/', include('dialogos.urls')),
	url(r'^comments/', include('dialogos.urls')),
	url(r'^ratings/', include('agon_ratings.urls')),
	url(r'^activity/', include('actstream.urls')),
	url(r'^announcements/', include('announcements.urls')),
	url(r'^messages/', include('user_messages.urls')),
	url(r'^social/', include('geonode.social.urls')),
	url(r'^security/', include('geonode.security.urls')),

	# Accounts
	url(r'^account/ajax_login$',
		geonode.views.ajax_login,
		name='account_ajax_login'),
	url(r'^account/ajax_lookup$',
		geonode.views.ajax_lookup,
		name='account_ajax_lookup'),
	url(
		r'^account/moderation_sent/(?P<inactive_user>[^/]*)$',
		geonode.views.moderator_contacted,
		name='moderator_contacted'),

	# Meta
	url(r'^lang\.js$', TemplateView.as_view(template_name='lang.js', content_type='text/javascript'),
		name='lang'),

	url(r'^jsi18n/$', javascript_catalog,
		js_info_dict, name='javascript-catalog'),
	url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps},
		name='sitemap'),
	url(r'^robots\.txt$', TemplateView.as_view(
		template_name='robots.txt'), name='robots'),

	# url(r'^i18n/', include('django.conf.urls.i18n')),
	url(r'^autocomplete/', include('autocomplete_light.urls')),
	# url(r'^admin/', include(admin.site.urls)),
	url(r'^groups/', include('geonode.groups.urls')),
	url(r'^documents/', include('geonode.documents.urls')),
	url(r'^services/', include('geonode.services.urls')),

	# OAuth Provider
	url(r'^o/',
		include('oauth2_provider.urls',
				namespace='oauth2_provider')),

	# Api Views
	url(r'^api/o/v4/tokeninfo',
		verify_token, name='tokeninfo'),
	url(r'^api/roles', roles, name='roles'),
	url(r'^api/adminRole', admin_role, name='adminRole'),
	url(r'^api/users', users, name='users'),
	url(r'', include(api.urls)), ]

urlpatterns += i18n_patterns(
	url("^admin/", include(admin.site.urls)),
)

urlpatterns += [
	url(r'^i18n/', include(django.conf.urls.i18n))
]

if "geonode.contrib.dynamic" in settings.INSTALLED_APPS:
	urlpatterns += [  # '',
		url(r'^dynamic/', include(
			'geonode.contrib.dynamic.urls')),
	]

if "geonode.contrib.metadataxsl" in settings.INSTALLED_APPS:
	urlpatterns += [  # '',
		url(r'^showmetadata/',
			include('geonode.contrib.metadataxsl.urls')),
	]

if "geonode.contrib.createlayer" in settings.INSTALLED_APPS:
	urlpatterns += [  # '',
		url(r'^createlayer/',
			include('geonode.contrib.createlayer.urls')),
	]

if check_ogc_backend(geoserver.BACKEND_PACKAGE):
	from geonode.geoserver.views import get_capabilities
	# GeoServer Helper Views
	urlpatterns += [  # '',
		# Upload views
		url(r'^upload/', include('geonode.upload.urls')),
		# capabilities
		url(r'^capabilities/layer/(?P<layerid>\d+)/$',
			get_capabilities, name='capabilities_layer'),
		url(r'^capabilities/map/(?P<mapid>\d+)/$',
			get_capabilities, name='capabilities_map'),
		url(r'^capabilities/user/(?P<user>[\w.-]+)/$',
			get_capabilities, name='capabilities_user'),
		url(r'^capabilities/category/(?P<category>\w+)/$',
			get_capabilities, name='capabilities_category'),
		url(r'^gs/', include('geonode.geoserver.urls')),
	]
if check_ogc_backend(qgis_server.BACKEND_PACKAGE):
	# QGIS Server's urls
	urlpatterns += [  # '',
		url(r'^qgis-server/',
			include(
			'geonode.qgis_server.urls',
			namespace='qgis_server')),
	]

if settings.NOTIFICATIONS_MODULE in settings.INSTALLED_APPS:
	notifications_urls = '{}.urls'.format(settings.NOTIFICATIONS_MODULE)
	urlpatterns += [  # '',
		url(r'^notifications/', include(notifications_urls)),
	]
if "djmp" in settings.INSTALLED_APPS:
	urlpatterns += [  # '',
		url(r'^djmp/', include('djmp.urls')),
	]

if 'geonode.contrib.ows_api' in settings.INSTALLED_APPS:
	urlpatterns += [  # '',
		url('^', include('geonode.contrib.ows_api.urls')),
	]

# Set up proxy
urlpatterns += geonode.proxy.urls.urlpatterns

# Serve static files
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.LOCAL_MEDIA_URL,
					  document_root=settings.MEDIA_ROOT)
handler403 = 'geonode.views.err403'

# Featured Maps Pattens
urlpatterns += [  # '',
	url(r'^featured/(?P<site>[A-Za-z0-9_\-]+)/$',
		geonode.maps.views.featured_map),
	url(r'^featured/(?P<site>[A-Za-z0-9_\-]+)/info$',
		geonode.maps.views.featured_map_info),
]


if settings.MONITORING_ENABLED:
	urlpatterns += [url(r'^monitoring/',
						include('geonode.contrib.monitoring.urls',
								namespace='monitoring'))]
