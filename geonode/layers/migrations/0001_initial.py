# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
import geonode.security.models
import django.core.files.storage


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attribute',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('attribute', models.CharField(help_text='name of attribute as stored in shapefile/spatial database', max_length=255, null=True, verbose_name='attribute name')),
                ('description', models.CharField(help_text='description of attribute to be used in metadata', max_length=255, null=True, verbose_name='attribute description', blank=True)),
                ('attribute_label', models.CharField(help_text='title of attribute as displayed in GeoNode', max_length=255, null=True, verbose_name='attribute label', blank=True)),
                ('attribute_type', models.CharField(default=b'xsd:string', help_text='the data type of the attribute (integer, string, geometry, etc)', max_length=50, verbose_name='attribute type')),
                ('visible', models.BooleanField(default=True, help_text='specifies if the attribute should be displayed in identify results', verbose_name='visible?')),
                ('display_order', models.IntegerField(default=1, help_text='specifies the order in which attribute should be displayed in identify results', verbose_name='display order')),
                ('count', models.IntegerField(default=1, help_text='count value for this field', verbose_name='count')),
                ('min', models.CharField(default=b'NA', max_length=255, null=True, verbose_name='min', help_text='minimum value for this field')),
                ('max', models.CharField(default=b'NA', max_length=255, null=True, verbose_name='max', help_text='maximum value for this field')),
                ('average', models.CharField(default=b'NA', max_length=255, null=True, verbose_name='average', help_text='average value for this field')),
                ('median', models.CharField(default=b'NA', max_length=255, null=True, verbose_name='median', help_text='median value for this field')),
                ('stddev', models.CharField(default=b'NA', max_length=255, null=True, verbose_name='standard deviation', help_text='standard deviation for this field')),
                ('sum', models.CharField(default=b'NA', max_length=255, null=True, verbose_name='sum', help_text='sum value for this field')),
                ('unique_values', models.TextField(default=b'NA', null=True, verbose_name='unique values for this field', blank=True)),
                ('last_stats_updated', models.DateTimeField(default=datetime.datetime.now, help_text='date when attribute statistics were last updated', verbose_name='last modified')),
            ],
        ),
        migrations.CreateModel(
            name='Layer',
            fields=[
                ('resourcebase_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='base.ResourceBase')),
                ('title_en', models.CharField(help_text='name by which the cited resource is known', max_length=255, null=True, verbose_name='title')),
                ('abstract_en', models.TextField(help_text='brief narrative summary of the content of the resource(s)', max_length=2000, null=True, verbose_name='abstract', blank=True)),
                ('purpose_en', models.TextField(help_text='summary of the intentions with which the resource(s) was developed', max_length=500, null=True, verbose_name='purpose', blank=True)),
                ('constraints_other_en', models.TextField(help_text='other restrictions and legal prerequisites for accessing and using the resource or metadata', null=True, verbose_name='restrictions other', blank=True)),
                ('supplemental_information_en', models.TextField(default='No information provided', max_length=2000, null=True, verbose_name='supplemental information', help_text='any other descriptive information about the dataset')),
                ('data_quality_statement_en', models.TextField(help_text="general explanation of the data producer's knowledge about the lineage of a dataset", max_length=2000, null=True, verbose_name='data quality statement', blank=True)),
                ('workspace', models.CharField(max_length=128)),
                ('store', models.CharField(max_length=128)),
                ('storeType', models.CharField(max_length=128)),
                ('name', models.CharField(max_length=128)),
                ('typename', models.CharField(max_length=128, null=True, blank=True)),
                ('is_mosaic', models.BooleanField(default=False)),
                ('has_time', models.BooleanField(default=False)),
                ('has_elevation', models.BooleanField(default=False)),
                ('time_regex', models.CharField(blank=True, max_length=128, null=True, choices=[(b'[0-9]{8}', 'YYYYMMDD'), (b'[0-9]{8}T[0-9]{6}', "YYYYMMDD'T'hhmmss"), (b'[0-9]{8}T[0-9]{6}Z', "YYYYMMDD'T'hhmmss'Z'")])),
                ('elevation_regex', models.CharField(max_length=128, null=True, blank=True)),
                ('charset', models.CharField(default=b'UTF-8', max_length=255)),
            ],
            options={
                'permissions': (('change_layer_data', 'Can edit layer data'), ('change_layer_style', 'Can change layer style')),
            },
            bases=('base.resourcebase',),
        ),
        migrations.CreateModel(
            name='LayerFile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('base', models.BooleanField(default=False)),
                ('file', models.FileField(storage=django.core.files.storage.FileSystemStorage(base_url=b'/uploaded/'), max_length=255, upload_to=b'layers')),
            ],
        ),
        migrations.CreateModel(
            name='Orglogo',
            fields=[
                ('id', models.IntegerField(serialize=False, primary_key=True)),
                ('name', models.CharField(max_length=255, blank=True)),
                ('filename', models.CharField(max_length=255, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Style',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=255, verbose_name='style name')),
                ('sld_title', models.CharField(max_length=255, null=True, blank=True)),
                ('sld_body', models.TextField(null=True, verbose_name='sld text', blank=True)),
                ('sld_version', models.CharField(max_length=12, null=True, verbose_name='sld version', blank=True)),
                ('sld_url', models.CharField(max_length=1000, null=True, verbose_name='sld url')),
                ('workspace', models.CharField(max_length=255, null=True, blank=True)),
            ],
            bases=(models.Model, geonode.security.models.PermissionLevelMixin),
        ),
        migrations.CreateModel(
            name='UploadSession',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateTimeField(auto_now=True)),
                ('processed', models.BooleanField(default=False)),
                ('error', models.TextField(null=True, blank=True)),
                ('traceback', models.TextField(null=True, blank=True)),
                ('context', models.TextField(null=True, blank=True)),
            ],
        ),
    ]
