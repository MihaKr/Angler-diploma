# Generated by Django 5.0.2 on 2024-07-25 20:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('angler_core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicationcontainers',
            name='size',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='applicationcontainers',
            name='type',
            field=models.CharField(default='ContNode', max_length=30),
            preserve_default=False,
        ),
    ]
