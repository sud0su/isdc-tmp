# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('maps', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='mapsnapshot',
            name='user',
            field=models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True),
        ),
        migrations.AddField(
            model_name='maplayer',
            name='map',
            field=models.ForeignKey(related_name='layer_set', to='maps.Map'),
        ),
    ]
