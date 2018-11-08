# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import mptt.fields
from django.conf import settings
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
        ('contenttypes', '0002_remove_content_type_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('auth', '0006_require_contenttypes_0002'),
    ]

    operations = [
        migrations.AddField(
            model_name='resourcebase',
            name='contacts',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL, through='base.ContactRole'),
        ),
        migrations.AddField(
            model_name='resourcebase',
            name='group',
            field=models.ForeignKey(blank=True, to='auth.Group', null=True),
        ),
        migrations.AddField(
            model_name='resourcebase',
            name='keywords',
            field=taggit.managers.TaggableManager(to='base.HierarchicalKeyword', through='base.TaggedContentItem', blank=True, help_text='commonly used word(s) or formalised word(s) or phrase(s) used to describe the subject (space or comma-separated', verbose_name='keywords'),
        ),
        migrations.AddField(
            model_name='resourcebase',
            name='license',
            field=models.ForeignKey(blank=True, to='base.License', help_text='license of the dataset', null=True, verbose_name='License'),
        ),
        migrations.AddField(
            model_name='resourcebase',
            name='owner',
            field=models.ForeignKey(related_name='owned_resource', verbose_name='Owner', blank=True, to=settings.AUTH_USER_MODEL, null=True),
        ),
        migrations.AddField(
            model_name='resourcebase',
            name='polymorphic_ctype',
            field=models.ForeignKey(related_name='polymorphic_base.resourcebase_set+', editable=False, to='contenttypes.ContentType', null=True),
        ),
        migrations.AddField(
            model_name='resourcebase',
            name='regions',
            field=models.ManyToManyField(help_text='keyword identifies a location', to='base.Region', verbose_name='keywords region', blank=True),
        ),
        migrations.AddField(
            model_name='resourcebase',
            name='restriction_code_type',
            field=models.ForeignKey(blank=True, to='base.RestrictionCodeType', help_text='limitation(s) placed upon the access or use of the data.', null=True, verbose_name='restrictions'),
        ),
        migrations.AddField(
            model_name='resourcebase',
            name='spatial_representation_type',
            field=models.ForeignKey(blank=True, to='base.SpatialRepresentationType', help_text='method used to represent geographic information in the dataset.', null=True, verbose_name='spatial representation type'),
        ),
        migrations.AddField(
            model_name='resourcebase',
            name='tkeywords',
            field=models.ManyToManyField(help_text='formalised word(s) or phrase(s) from a fixed thesaurus used to describe the subject (space or comma-separated', to='base.ThesaurusKeyword', blank=True),
        ),
        migrations.AddField(
            model_name='region',
            name='parent',
            field=mptt.fields.TreeForeignKey(related_name='children', blank=True, to='base.Region', null=True),
        ),
        migrations.AddField(
            model_name='link',
            name='resource',
            field=models.ForeignKey(blank=True, to='base.ResourceBase', null=True),
        ),
        migrations.AddField(
            model_name='contactrole',
            name='contact',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='contactrole',
            name='resource',
            field=models.ForeignKey(blank=True, to='base.ResourceBase', null=True),
        ),
        migrations.AlterUniqueTogether(
            name='thesauruskeywordlabel',
            unique_together=set([('keyword', 'lang')]),
        ),
        migrations.AlterUniqueTogether(
            name='thesauruskeyword',
            unique_together=set([('thesaurus', 'alt_label')]),
        ),
        migrations.AlterUniqueTogether(
            name='contactrole',
            unique_together=set([('contact', 'resource', 'role')]),
        ),
    ]
