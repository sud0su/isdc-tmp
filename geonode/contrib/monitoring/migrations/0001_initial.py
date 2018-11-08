# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import jsonfield.fields
import datetime


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ExceptionEvent',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(db_index=True)),
                ('received', models.DateTimeField(db_index=True)),
                ('error_type', models.CharField(max_length=255, db_index=True)),
                ('error_message', models.CharField(default=b'', max_length=255)),
                ('error_data', models.TextField(default=b'')),
            ],
        ),
        migrations.CreateModel(
            name='Host',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=255)),
                ('ip', models.GenericIPAddressField()),
                ('active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Metric',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, db_index=True)),
                ('description', models.CharField(max_length=255, null=True)),
                ('type', models.CharField(default=b'rate', max_length=255, choices=[(b'rate', b'Rate'), (b'count', b'Count'), (b'value', b'Value'), (b'value_numeric', b'Value numeric')])),
                ('unit', models.CharField(blank=True, max_length=255, null=True, choices=[(b'B', b'Bytes'), (b'KB', b'Kilobytes'), (b'MB', b'Megabytes'), (b'GB', b'Gigabytes'), (b'B/s', b'Bytes per second'), (b'KB/s', b'Kilobytes per second'), (b'MB/s', b'Megabytes per second'), (b'GB/s', b'Gigabytes per second'), (b's', b'Seconds'), (b'Rate', b'Rate'), (b'%', b'Percentage'), (b'Count', b'Count')])),
            ],
        ),
        migrations.CreateModel(
            name='MetricLabel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.TextField(default=b'', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='MetricNotificationCheck',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('min_value', models.DecimalField(default=None, null=True, max_digits=16, decimal_places=4, blank=True)),
                ('max_value', models.DecimalField(default=None, null=True, max_digits=16, decimal_places=4, blank=True)),
                ('max_timeout', models.DurationField(help_text=b'Max timeout for given metric before error should be raised', null=True, blank=True)),
                ('active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='MetricValue',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('valid_from', models.DateTimeField(db_index=True)),
                ('valid_to', models.DateTimeField(db_index=True)),
                ('value', models.CharField(max_length=255)),
                ('value_num', models.DecimalField(default=None, null=True, max_digits=16, decimal_places=4, blank=True)),
                ('value_raw', models.TextField(default=None, null=True, blank=True)),
                ('samples_count', models.PositiveIntegerField(default=0)),
                ('data', jsonfield.fields.JSONField(default={})),
            ],
        ),
        migrations.CreateModel(
            name='MonitoredResource',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(default=b'', max_length=255, blank=True)),
                ('type', models.CharField(default=b'', max_length=255, choices=[(b'', b'No resource'), (b'layer', b'Layer'), (b'map', b'Map'), (b'document', b'Document'), (b'style', b'Style'), (b'admin', b'Admin'), (b'other', b'Other')])),
            ],
        ),
        migrations.CreateModel(
            name='NotificationCheck',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=255)),
                ('description', models.CharField(help_text=b'Description of the alert', max_length=255)),
                ('user_threshold', jsonfield.fields.JSONField(default={}, help_text=b'Expected min/max values for user configuration')),
                ('last_send', models.DateTimeField(help_text=b'Marker of last delivery', null=True, blank=True)),
                ('grace_period', models.DurationField(default=datetime.timedelta(0, 600), help_text=b'Minimum time between subsequent notifications', choices=[(datetime.timedelta(0, 60), b'1 minute'), (datetime.timedelta(0, 300), b'5 minutes'), (datetime.timedelta(0, 600), b'10 minutes'), (datetime.timedelta(0, 1800), b'30 minutes'), (datetime.timedelta(0, 3600), b'1 hour')])),
                ('severity', models.CharField(default=b'error', help_text=b'How severe would be error from this notification', max_length=32, choices=[(b'warning', b'Warning'), (b'error', b'Error'), (b'fatal', b'Fatal')])),
                ('active', models.BooleanField(default=True, help_text=b'Is it active')),
            ],
        ),
        migrations.CreateModel(
            name='NotificationMetricDefinition',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('use_service', models.BooleanField(default=False)),
                ('use_resource', models.BooleanField(default=False)),
                ('use_label', models.BooleanField(default=False)),
                ('use_ows_service', models.BooleanField(default=False)),
                ('field_option', models.CharField(default=b'min_value', max_length=32, choices=[(b'min_value', b'Value must be above'), (b'max_value', b'Value must be below'), (b'max_timeout', b'Last update must not be older than')])),
                ('description', models.TextField(null=True)),
                ('min_value', models.DecimalField(default=None, null=True, max_digits=16, decimal_places=4, blank=True)),
                ('max_value', models.DecimalField(default=None, null=True, max_digits=16, decimal_places=4, blank=True)),
                ('steps', models.PositiveIntegerField(default=None, null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='NotificationReceiver',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('email', models.EmailField(max_length=254, null=True, blank=True)),
                ('notification_check', models.ForeignKey(related_name='receivers', to='monitoring.NotificationCheck')),
            ],
        ),
        migrations.CreateModel(
            name='OWSService',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=16, choices=[(b'TMS', b'TMS'), (b'WMS-C', b'WMS-C'), (b'WMTS', b'WMTS'), (b'WCS', b'WCS'), (b'WFS', b'WFS'), (b'WMS', b'WMS'), (b'WPS', b'WPS'), (b'all', b'All'), (b'other', b'Other')])),
            ],
        ),
        migrations.CreateModel(
            name='RequestEvent',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(db_index=True)),
                ('received', models.DateTimeField(db_index=True)),
                ('host', models.CharField(default=b'', max_length=255, blank=True)),
                ('request_path', models.TextField(default=b'')),
                ('request_method', models.CharField(max_length=16, choices=[(b'GET', b'GET'), (b'POST', b'POST'), (b'HEAD', b'HEAD'), (b'OPTIONS', b'OPTIONS'), (b'PUT', b'PUT'), (b'DELETE', b'DELETE')])),
                ('response_status', models.PositiveIntegerField()),
                ('response_size', models.PositiveIntegerField(default=0)),
                ('response_time', models.PositiveIntegerField(default=0, help_text=b'Response processing time in ms')),
                ('response_type', models.CharField(default=b'', max_length=255, null=True, blank=True)),
                ('user_agent', models.CharField(default=None, max_length=255, null=True, blank=True)),
                ('user_agent_family', models.CharField(default=None, max_length=255, null=True, blank=True)),
                ('client_ip', models.GenericIPAddressField()),
                ('client_lat', models.DecimalField(default=None, null=True, max_digits=8, decimal_places=5, blank=True)),
                ('client_lon', models.DecimalField(default=None, null=True, max_digits=8, decimal_places=5, blank=True)),
                ('client_country', models.CharField(default=None, max_length=255, null=True, blank=True)),
                ('client_region', models.CharField(default=None, max_length=255, null=True, blank=True)),
                ('client_city', models.CharField(default=None, max_length=255, null=True, blank=True)),
                ('custom_id', models.CharField(default=None, max_length=255, null=True, db_index=True, blank=True)),
                ('ows_service', models.ForeignKey(blank=True, to='monitoring.OWSService', null=True)),
                ('resources', models.ManyToManyField(help_text=b'List of resources affected', related_name='requests', to='monitoring.MonitoredResource', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=255)),
                ('check_interval', models.DurationField(default=datetime.timedelta(0, 60))),
                ('last_check', models.DateTimeField(null=True, blank=True)),
                ('active', models.BooleanField(default=True)),
                ('notes', models.TextField(null=True, blank=True)),
                ('url', models.URLField(default=b'', null=True, blank=True)),
                ('host', models.ForeignKey(to='monitoring.Host')),
            ],
        ),
        migrations.CreateModel(
            name='ServiceType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=255, choices=[(b'geonode', b'GeoNode'), (b'geoserver', b'GeoServer'), (b'hostgeoserver', b'Host (GeoServer)'), (b'hostgeonode', b'Host (GeoNode)')])),
            ],
        ),
        migrations.CreateModel(
            name='ServiceTypeMetric',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('metric', models.ForeignKey(related_name='service_type', to='monitoring.Metric')),
                ('service_type', models.ForeignKey(related_name='metric', to='monitoring.ServiceType')),
            ],
        ),
        migrations.AddField(
            model_name='service',
            name='service_type',
            field=models.ForeignKey(to='monitoring.ServiceType'),
        ),
        migrations.AddField(
            model_name='requestevent',
            name='service',
            field=models.ForeignKey(to='monitoring.Service'),
        ),
    ]
