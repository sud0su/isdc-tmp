# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('layers', '0001_initial'),
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='uploadsession',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='orglogo',
            name='layer',
            field=models.ManyToManyField(to='layers.Layer'),
        ),
        migrations.AddField(
            model_name='layerfile',
            name='upload_session',
            field=models.ForeignKey(to='layers.UploadSession'),
        ),
        migrations.AddField(
            model_name='layer',
            name='default_style',
            field=models.ForeignKey(related_name='layer_default_style', on_delete=django.db.models.deletion.SET_NULL, blank=True, to='layers.Style', null=True),
        ),
        migrations.AddField(
            model_name='layer',
            name='remote_service',
            field=models.ForeignKey(blank=True, to='services.Service', null=True),
        ),
        migrations.AddField(
            model_name='layer',
            name='styles',
            field=models.ManyToManyField(related_name='layer_styles', to='layers.Style'),
        ),
        migrations.AddField(
            model_name='layer',
            name='upload_session',
            field=models.ForeignKey(blank=True, to='layers.UploadSession', null=True),
        ),
        migrations.AddField(
            model_name='attribute',
            name='layer',
            field=models.ForeignKey(related_name='attribute_set', to='layers.Layer'),
        ),
    ]
