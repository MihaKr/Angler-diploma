# Generated by Django 5.0.2 on 2024-06-13 23:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('angler_core', '0020_alter_linkcontainers_destination_edge_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='allcontainers',
            name='container_group',
            field=models.CharField(default='Core', max_length=100),
        ),
    ]
