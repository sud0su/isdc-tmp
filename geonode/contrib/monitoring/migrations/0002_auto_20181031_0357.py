# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='notificationreceiver',
            name='user',
            field=models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True),
        ),
        migrations.AddField(
            model_name='notificationmetricdefinition',
            name='metric',
            field=models.ForeignKey(related_name='notification_checks', to='monitoring.Metric'),
        ),
        migrations.AddField(
            model_name='notificationmetricdefinition',
            name='notification_check',
            field=models.ForeignKey(related_name='definitions', to='monitoring.NotificationCheck'),
        ),
        migrations.AddField(
            model_name='notificationcheck',
            name='metrics',
            field=models.ManyToManyField(related_name='_notificationcheck_metrics_+', through='monitoring.NotificationMetricDefinition', to='monitoring.Metric'),
        ),
        migrations.AlterUniqueTogether(
            name='monitoredresource',
            unique_together=set([('name', 'type')]),
        ),
        migrations.AddField(
            model_name='metricvalue',
            name='label',
            field=models.ForeignKey(related_name='metric_values', to='monitoring.MetricLabel'),
        ),
        migrations.AddField(
            model_name='metricvalue',
            name='ows_service',
            field=models.ForeignKey(related_name='metric_values', blank=True, to='monitoring.OWSService', null=True),
        ),
        migrations.AddField(
            model_name='metricvalue',
            name='resource',
            field=models.ForeignKey(related_name='metric_values', to='monitoring.MonitoredResource'),
        ),
        migrations.AddField(
            model_name='metricvalue',
            name='service',
            field=models.ForeignKey(to='monitoring.Service'),
        ),
        migrations.AddField(
            model_name='metricvalue',
            name='service_metric',
            field=models.ForeignKey(to='monitoring.ServiceTypeMetric'),
        ),
        migrations.AddField(
            model_name='metricnotificationcheck',
            name='definition',
            field=models.OneToOneField(related_name='metric_check', null=True, to='monitoring.NotificationMetricDefinition'),
        ),
        migrations.AddField(
            model_name='metricnotificationcheck',
            name='label',
            field=models.ForeignKey(blank=True, to='monitoring.MetricLabel', null=True),
        ),
        migrations.AddField(
            model_name='metricnotificationcheck',
            name='metric',
            field=models.ForeignKey(related_name='checks', to='monitoring.Metric'),
        ),
        migrations.AddField(
            model_name='metricnotificationcheck',
            name='notification_check',
            field=models.ForeignKey(related_name='checks', to='monitoring.NotificationCheck'),
        ),
        migrations.AddField(
            model_name='metricnotificationcheck',
            name='ows_service',
            field=models.ForeignKey(blank=True, to='monitoring.OWSService', null=True),
        ),
        migrations.AddField(
            model_name='metricnotificationcheck',
            name='resource',
            field=models.ForeignKey(blank=True, to='monitoring.MonitoredResource', null=True),
        ),
        migrations.AddField(
            model_name='metricnotificationcheck',
            name='service',
            field=models.ForeignKey(related_name='checks', blank=True, to='monitoring.Service', null=True),
        ),
        migrations.AddField(
            model_name='exceptionevent',
            name='request',
            field=models.ForeignKey(related_name='exceptions', to='monitoring.RequestEvent'),
        ),
        migrations.AddField(
            model_name='exceptionevent',
            name='service',
            field=models.ForeignKey(to='monitoring.Service'),
        ),
        migrations.AlterUniqueTogether(
            name='metricvalue',
            unique_together=set([('valid_from', 'valid_to', 'service', 'service_metric', 'resource', 'label', 'ows_service')]),
        ),
    ]
