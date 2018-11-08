# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
import geonode.security.models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Backup',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('identifier', models.CharField(max_length=255, editable=False)),
                ('name', models.CharField(max_length=100)),
                ('name_en', models.CharField(max_length=100, null=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('description', models.TextField(null=True, blank=True)),
                ('description_en', models.TextField(null=True, blank=True)),
                ('base_folder', models.CharField(max_length=100)),
                ('location', models.TextField(null=True, blank=True)),
            ],
            options={
                'ordering': ('date',),
                'verbose_name_plural': 'Backups',
            },
        ),
        migrations.CreateModel(
            name='ContactRole',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('role', models.CharField(help_text='function performed by the responsible party', max_length=255, choices=[(b'author', 'party who authored the resource'), (b'processor', 'party who has processed the data in a manner such that the resource has been modified'), (b'publisher', 'party who published the resource'), (b'custodian', 'party that accepts accountability and responsibility for the data and ensures         appropriate care and maintenance of the resource'), (b'pointOfContact', 'party who can be contacted for acquiring knowledge about or acquisition of the resource'), (b'distributor', 'party who distributes the resource'), (b'user', 'party who uses the resource'), (b'resourceProvider', 'party that supplies the resource'), (b'originator', 'party who created the resource'), (b'owner', 'party that owns the resource'), (b'principalInvestigator', 'key party responsible for gathering information and conducting research')])),
            ],
        ),
        migrations.CreateModel(
            name='HierarchicalKeyword',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=100, verbose_name='Name')),
                ('slug', models.SlugField(unique=True, max_length=100, verbose_name='Slug')),
                ('path', models.CharField(unique=True, max_length=255)),
                ('depth', models.PositiveIntegerField()),
                ('numchild', models.PositiveIntegerField(default=0)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='License',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('identifier', models.CharField(max_length=255, editable=False)),
                ('name', models.CharField(max_length=100)),
                ('name_en', models.CharField(max_length=100, null=True)),
                ('abbreviation', models.CharField(max_length=20, null=True, blank=True)),
                ('description', models.TextField(null=True, blank=True)),
                ('description_en', models.TextField(null=True, blank=True)),
                ('url', models.URLField(max_length=2000, null=True, blank=True)),
                ('license_text', models.TextField(null=True, blank=True)),
                ('license_text_en', models.TextField(null=True, blank=True)),
            ],
            options={
                'ordering': ('name',),
                'verbose_name_plural': 'Licenses',
            },
        ),
        migrations.CreateModel(
            name='Link',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('extension', models.CharField(help_text='For example "kml"', max_length=255)),
                ('link_type', models.CharField(max_length=255, choices=[(b'original', b'original'), (b'data', b'data'), (b'image', b'image'), (b'metadata', b'metadata'), (b'html', b'html'), (b'OGC:WMS', b'OGC:WMS'), (b'OGC:WFS', b'OGC:WFS'), (b'OGC:WCS', b'OGC:WCS')])),
                ('name', models.CharField(help_text='For example "View in Google Earth"', max_length=255)),
                ('mime', models.CharField(help_text='For example "text/xml"', max_length=255)),
                ('url', models.TextField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Region',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('code', models.CharField(unique=True, max_length=50)),
                ('name', models.CharField(max_length=255)),
                ('name_en', models.CharField(max_length=255, null=True)),
                ('bbox_x0', models.DecimalField(null=True, max_digits=30, decimal_places=15, blank=True)),
                ('bbox_x1', models.DecimalField(null=True, max_digits=30, decimal_places=15, blank=True)),
                ('bbox_y0', models.DecimalField(null=True, max_digits=30, decimal_places=15, blank=True)),
                ('bbox_y1', models.DecimalField(null=True, max_digits=30, decimal_places=15, blank=True)),
                ('srid', models.CharField(default=b'EPSG:4326', max_length=30)),
                ('lft', models.PositiveIntegerField(editable=False, db_index=True)),
                ('rght', models.PositiveIntegerField(editable=False, db_index=True)),
                ('tree_id', models.PositiveIntegerField(editable=False, db_index=True)),
                ('level', models.PositiveIntegerField(editable=False, db_index=True)),
            ],
            options={
                'ordering': ('name',),
                'verbose_name_plural': 'Metadata Regions',
            },
        ),
        migrations.CreateModel(
            name='ResourceBase',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('uuid', models.CharField(max_length=36)),
                ('title', models.CharField(help_text='name by which the cited resource is known', max_length=255, verbose_name='title')),
                ('alternate', models.CharField(max_length=128, null=True, blank=True)),
                ('date', models.DateTimeField(default=datetime.datetime.now, help_text='reference date for the cited resource', verbose_name='date')),
                ('date_type', models.CharField(default=b'publication', help_text='identification of when a given event occurred', max_length=255, verbose_name='date type', choices=[(b'creation', 'Creation'), (b'publication', 'Publication'), (b'revision', 'Revision')])),
                ('edition', models.CharField(help_text='version of the cited resource', max_length=255, null=True, verbose_name='edition', blank=True)),
                ('abstract', models.TextField(help_text='brief narrative summary of the content of the resource(s)', max_length=2000, verbose_name='abstract', blank=True)),
                ('purpose', models.TextField(help_text='summary of the intentions with which the resource(s) was developed', max_length=500, null=True, verbose_name='purpose', blank=True)),
                ('maintenance_frequency', models.CharField(choices=[(b'unknown', 'frequency of maintenance for the data is not known'), (b'continual', 'data is repeatedly and frequently updated'), (b'notPlanned', 'there are no plans to update the data'), (b'daily', 'data is updated each day'), (b'annually', 'data is updated every year'), (b'asNeeded', 'data is updated as deemed necessary'), (b'monthly', 'data is updated each month'), (b'fortnightly', 'data is updated every two weeks'), (b'irregular', 'data is updated in intervals that are uneven in duration'), (b'weekly', 'data is updated on a weekly basis'), (b'biannually', 'data is updated twice each year'), (b'quarterly', 'data is updated every three months')], max_length=255, blank=True, help_text='frequency with which modifications and deletions are made to the data after it is first produced', null=True, verbose_name='maintenance frequency')),
                ('constraints_other', models.TextField(help_text='other restrictions and legal prerequisites for accessing and using the resource or metadata', null=True, verbose_name='restrictions other', blank=True)),
                ('language', models.CharField(default=b'eng', help_text='language used within the dataset', max_length=3, verbose_name='language', choices=[(b'abk', b'Abkhazian'), (b'aar', b'Afar'), (b'afr', b'Afrikaans'), (b'amh', b'Amharic'), (b'ara', b'Arabic'), (b'asm', b'Assamese'), (b'aym', b'Aymara'), (b'aze', b'Azerbaijani'), (b'bak', b'Bashkir'), (b'ben', b'Bengali'), (b'bih', b'Bihari'), (b'bis', b'Bislama'), (b'bre', b'Breton'), (b'bul', b'Bulgarian'), (b'bel', b'Byelorussian'), (b'cat', b'Catalan'), (b'cos', b'Corsican'), (b'dan', b'Danish'), (b'dzo', b'Dzongkha'), (b'eng', b'English'), (b'fra', b'French'), (b'epo', b'Esperanto'), (b'est', b'Estonian'), (b'fao', b'Faroese'), (b'fij', b'Fijian'), (b'fin', b'Finnish'), (b'fry', b'Frisian'), (b'glg', b'Gallegan'), (b'ger', b'German'), (b'gre', b'Greek'), (b'kal', b'Greenlandic'), (b'grn', b'Guarani'), (b'guj', b'Gujarati'), (b'hau', b'Hausa'), (b'heb', b'Hebrew'), (b'hin', b'Hindi'), (b'hun', b'Hungarian'), (b'ind', b'Indonesian'), (b'ina', b'Interlingua (International Auxiliary language Association)'), (b'iku', b'Inuktitut'), (b'ipk', b'Inupiak'), (b'ita', b'Italian'), (b'jpn', b'Japanese'), (b'kan', b'Kannada'), (b'kas', b'Kashmiri'), (b'kaz', b'Kazakh'), (b'khm', b'Khmer'), (b'kin', b'Kinyarwanda'), (b'kir', b'Kirghiz'), (b'kor', b'Korean'), (b'kur', b'Kurdish'), (b'oci', b"Langue d 'Oc (post 1500)"), (b'lao', b'Lao'), (b'lat', b'Latin'), (b'lav', b'Latvian'), (b'lin', b'Lingala'), (b'lit', b'Lithuanian'), (b'mlg', b'Malagasy'), (b'mlt', b'Maltese'), (b'mar', b'Marathi'), (b'mol', b'Moldavian'), (b'mon', b'Mongolian'), (b'nau', b'Nauru'), (b'nep', b'Nepali'), (b'nor', b'Norwegian'), (b'ori', b'Oriya'), (b'orm', b'Oromo'), (b'pan', b'Panjabi'), (b'pol', b'Polish'), (b'por', b'Portuguese'), (b'pus', b'Pushto'), (b'que', b'Quechua'), (b'roh', b'Rhaeto-Romance'), (b'run', b'Rundi'), (b'rus', b'Russian'), (b'smo', b'Samoan'), (b'sag', b'Sango'), (b'san', b'Sanskrit'), (b'scr', b'Serbo-Croatian'), (b'sna', b'Shona'), (b'snd', b'Sindhi'), (b'sin', b'Singhalese'), (b'ssw', b'Siswant'), (b'slv', b'Slovenian'), (b'som', b'Somali'), (b'sot', b'Sotho'), (b'spa', b'Spanish'), (b'sun', b'Sudanese'), (b'swa', b'Swahili'), (b'tgl', b'Tagalog'), (b'tgk', b'Tajik'), (b'tam', b'Tamil'), (b'tat', b'Tatar'), (b'tel', b'Telugu'), (b'tha', b'Thai'), (b'tir', b'Tigrinya'), (b'tog', b'Tonga (Nyasa)'), (b'tso', b'Tsonga'), (b'tsn', b'Tswana'), (b'tur', b'Turkish'), (b'tuk', b'Turkmen'), (b'twi', b'Twi'), (b'uig', b'Uighur'), (b'ukr', b'Ukrainian'), (b'urd', b'Urdu'), (b'uzb', b'Uzbek'), (b'vie', b'Vietnamese'), (b'vol', b'Volap\xc3\xbck'), (b'wol', b'Wolof'), (b'xho', b'Xhosa'), (b'yid', b'Yiddish'), (b'yor', b'Yoruba'), (b'zha', b'Zhuang'), (b'zul', b'Zulu')])),
                ('temporal_extent_start', models.DateTimeField(help_text='time period covered by the content of the dataset (start)', null=True, verbose_name='temporal extent start', blank=True)),
                ('temporal_extent_end', models.DateTimeField(help_text='time period covered by the content of the dataset (end)', null=True, verbose_name='temporal extent end', blank=True)),
                ('supplemental_information', models.TextField(default='No information provided', help_text='any other descriptive information about the dataset', max_length=2000, verbose_name='supplemental information')),
                ('data_quality_statement', models.TextField(help_text="general explanation of the data producer's knowledge about the lineage of a dataset", max_length=2000, null=True, verbose_name='data quality statement', blank=True)),
                ('bbox_x0', models.DecimalField(null=True, max_digits=30, decimal_places=15, blank=True)),
                ('bbox_x1', models.DecimalField(null=True, max_digits=30, decimal_places=15, blank=True)),
                ('bbox_y0', models.DecimalField(null=True, max_digits=30, decimal_places=15, blank=True)),
                ('bbox_y1', models.DecimalField(null=True, max_digits=30, decimal_places=15, blank=True)),
                ('srid', models.CharField(default=b'EPSG:4326', max_length=30)),
                ('csw_typename', models.CharField(default=b'gmd:MD_Metadata', max_length=32, verbose_name='CSW typename')),
                ('csw_schema', models.CharField(default=b'http://www.isotc211.org/2005/gmd', max_length=64, verbose_name='CSW schema')),
                ('csw_mdsource', models.CharField(default=b'local', max_length=256, verbose_name='CSW source')),
                ('csw_insert_date', models.DateTimeField(auto_now_add=True, verbose_name='CSW insert date', null=True)),
                ('csw_type', models.CharField(default=b'dataset', max_length=32, verbose_name='CSW type', choices=[(b'series', 'series'), (b'software', 'computer program or routine'), (b'featureType', 'feature type'), (b'model', 'copy or imitation of an existing or hypothetical object'), (b'collectionHardware', 'collection hardware'), (b'collectionSession', 'collection session'), (b'nonGeographicDataset', 'non-geographic data'), (b'propertyType', 'property type'), (b'fieldSession', 'field session'), (b'dataset', 'dataset'), (b'service', 'service interfaces'), (b'attribute', 'attribute class'), (b'attributeType', 'characteristic of a feature'), (b'tile', 'tile or spatial subset of geographic data'), (b'feature', 'feature'), (b'dimensionGroup', 'dimension group')])),
                ('csw_anytext', models.TextField(null=True, verbose_name='CSW anytext', blank=True)),
                ('csw_wkt_geometry', models.TextField(default=b'POLYGON((-180 -90,-180 90,180 90,180 -90,-180 -90))', verbose_name='CSW WKT geometry')),
                ('metadata_uploaded', models.BooleanField(default=False)),
                ('metadata_uploaded_preserve', models.BooleanField(default=False)),
                ('metadata_xml', models.TextField(default=b'<gmd:MD_Metadata xmlns:gmd="http://www.isotc211.org/2005/gmd"/>', null=True, blank=True)),
                ('popular_count', models.IntegerField(default=0)),
                ('share_count', models.IntegerField(default=0)),
                ('featured', models.BooleanField(default=False, help_text='Should this resource be advertised in home page?', verbose_name='Featured')),
                ('is_published', models.BooleanField(default=True, help_text='Should this resource be published and searchable?', verbose_name='Is Published')),
                ('is_approved', models.BooleanField(default=True, help_text='Is this resource validated from a publisher or editor?', verbose_name='Approved')),
                ('thumbnail_url', models.TextField(null=True, blank=True)),
                ('detail_url', models.CharField(max_length=255, null=True, blank=True)),
                ('rating', models.IntegerField(default=0, null=True, blank=True)),
            ],
            options={
                'permissions': (('view_resourcebase', 'Can view resource'), ('change_resourcebase_permissions', 'Can change resource permissions'), ('download_resourcebase', 'Can download resource'), ('publish_resourcebase', 'Can publish resource'), ('change_resourcebase_metadata', 'Can change resource metadata')),
            },
            bases=(geonode.security.models.PermissionLevelMixin, models.Model),
        ),
        migrations.CreateModel(
            name='RestrictionCodeType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('identifier', models.CharField(max_length=255, editable=False)),
                ('description', models.TextField(max_length=255, editable=False)),
                ('description_en', models.TextField(max_length=255, null=True, editable=False)),
                ('gn_description', models.TextField(max_length=255, verbose_name=b'GeoNode description')),
                ('gn_description_en', models.TextField(max_length=255, null=True, verbose_name=b'GeoNode description')),
                ('is_choice', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ('identifier',),
                'verbose_name_plural': 'Metadata Restriction Code Types',
            },
        ),
        migrations.CreateModel(
            name='SpatialRepresentationType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('identifier', models.CharField(max_length=255, editable=False)),
                ('description', models.CharField(max_length=255, editable=False)),
                ('description_en', models.CharField(max_length=255, null=True, editable=False)),
                ('gn_description', models.CharField(max_length=255, verbose_name=b'GeoNode description')),
                ('gn_description_en', models.CharField(max_length=255, null=True, verbose_name=b'GeoNode description')),
                ('is_choice', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ('identifier',),
                'verbose_name_plural': 'Metadata Spatial Representation Types',
            },
        ),
        migrations.CreateModel(
            name='TaggedContentItem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('content_object', models.ForeignKey(to='base.ResourceBase')),
                ('tag', models.ForeignKey(related_name='keywords', to='base.HierarchicalKeyword')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Thesaurus',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('identifier', models.CharField(unique=True, max_length=255)),
                ('title', models.CharField(max_length=255)),
                ('date', models.CharField(default=b'', max_length=20)),
                ('description', models.TextField(default=b'', max_length=255)),
                ('slug', models.CharField(default=b'', max_length=64)),
            ],
            options={
                'ordering': ('identifier',),
                'verbose_name_plural': 'Thesauri',
            },
        ),
        migrations.CreateModel(
            name='ThesaurusKeyword',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('about', models.CharField(max_length=255, null=True, blank=True)),
                ('alt_label', models.CharField(default=b'', max_length=255, null=True, blank=True)),
                ('thesaurus', models.ForeignKey(related_name='thesaurus', to='base.Thesaurus')),
            ],
            options={
                'ordering': ('alt_label',),
                'verbose_name_plural': 'Thesaurus Keywords',
            },
        ),
        migrations.CreateModel(
            name='ThesaurusKeywordLabel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('lang', models.CharField(max_length=3)),
                ('label', models.CharField(max_length=255)),
                ('keyword', models.ForeignKey(related_name='keyword', to='base.ThesaurusKeyword')),
            ],
            options={
                'ordering': ('keyword', 'lang'),
                'verbose_name_plural': 'Labels',
            },
        ),
        migrations.CreateModel(
            name='TopicCategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('identifier', models.CharField(default=b'location', max_length=255)),
                ('description', models.TextField(default=b'')),
                ('description_en', models.TextField(default=b'', null=True)),
                ('gn_description', models.TextField(default=b'', null=True, verbose_name=b'GeoNode description')),
                ('gn_description_en', models.TextField(default=b'', null=True, verbose_name=b'GeoNode description')),
                ('is_choice', models.BooleanField(default=True)),
                ('fa_class', models.CharField(default=b'fa-times', max_length=64)),
            ],
            options={
                'ordering': ('identifier',),
                'verbose_name_plural': 'Metadata Topic Categories',
            },
        ),
        migrations.AddField(
            model_name='resourcebase',
            name='category',
            field=models.ForeignKey(blank=True, to='base.TopicCategory', help_text='high-level geographic data thematic classification to assist in the grouping and search of available geographic data sets.', null=True),
        ),
    ]
