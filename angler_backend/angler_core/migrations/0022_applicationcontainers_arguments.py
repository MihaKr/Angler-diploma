# Generated by Django 5.0.2 on 2024-07-12 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('angler_core', '0021_allcontainers_container_group'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicationcontainers',
            name='arguments',
            field=models.JSONField(blank=True, null=True),
        ),
    ]