# Generated by Django 5.0.2 on 2024-03-23 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('angler_core', '0019_linkcontainers_app_id_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='linkcontainers',
            name='destination_edge',
            field=models.CharField(max_length=10),
        ),
        migrations.AlterField(
            model_name='linkcontainers',
            name='origin_edge',
            field=models.CharField(max_length=10),
        ),
    ]
