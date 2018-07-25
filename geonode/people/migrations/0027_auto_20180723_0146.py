# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0026_auto_20171120_0730'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='org_acronym',
            field=models.CharField(help_text='Organisation acronym', max_length=255, null=True, verbose_name='Organisation acronym', blank=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='org_name_status',
            field=models.CharField(help_text='Organisation Name Status', max_length=255, null=True, verbose_name='Organisation Name Status', blank=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='org_type',
            field=models.CharField(help_text='Organisation Type', max_length=255, null=True, verbose_name='Organisation Type', blank=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='title',
            field=models.CharField(help_text='Title', max_length=30, null=True, verbose_name='Title', blank=True),
        ),
    ]
