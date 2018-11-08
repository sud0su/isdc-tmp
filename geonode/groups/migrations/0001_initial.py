# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0002_auto_20150616_2121'),
        ('auth', '0006_require_contenttypes_0002'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupCategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('slug', models.SlugField(unique=True, max_length=255)),
                ('name', models.CharField(unique=True, max_length=255)),
                ('name_en', models.CharField(max_length=255, unique=True, null=True)),
                ('description', models.TextField(default=None, null=True, blank=True)),
            ],
            options={
                'verbose_name_plural': 'Group Categories',
            },
        ),
        migrations.CreateModel(
            name='GroupMember',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('role', models.CharField(max_length=10, choices=[(b'manager', 'Manager'), (b'member', 'Member')])),
                ('joined', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
        migrations.CreateModel(
            name='GroupProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=50, verbose_name='Title')),
                ('title_en', models.CharField(max_length=50, null=True, verbose_name='Title')),
                ('slug', models.SlugField(unique=True)),
                ('logo', models.ImageField(upload_to=b'people_group', verbose_name='Logo', blank=True)),
                ('description', models.TextField(verbose_name='Description')),
                ('description_en', models.TextField(null=True, verbose_name='Description')),
                ('email', models.EmailField(help_text='Email used to contact one or all group members, such as a mailing list, shared email, or exchange group.', max_length=254, null=True, verbose_name='Email', blank=True)),
                ('access', models.CharField(default=b"public'", help_text='Public: Any registered user can view and join a public group.<br>Public (invite-only):Any registered user can view the group.  Only invited users can join.<br>Private: Registered users cannot see any details about the group, including membership.  Only invited users can join.', max_length=15, verbose_name='Access', choices=[(b'public', 'Public'), (b'public-invite', 'Public (invite-only)'), (b'private', 'Private')])),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('categories', models.ManyToManyField(related_name='groups', to='groups.GroupCategory', blank=True)),
                ('group', models.OneToOneField(to='auth.Group')),
                ('keywords', taggit.managers.TaggableManager(to='taggit.Tag', through='taggit.TaggedItem', blank=True, help_text='A space or comma-separated list of keywords', verbose_name='Keywords')),
            ],
        ),
        migrations.AddField(
            model_name='groupmember',
            name='group',
            field=models.ForeignKey(to='groups.GroupProfile'),
        ),
    ]
