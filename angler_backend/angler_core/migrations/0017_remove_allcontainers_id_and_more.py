# Generated by Django 5.0.2 on 2024-03-13 00:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('angler_core', '0016_allcontainers'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='allcontainers',
            name='id',
        ),
        migrations.AlterField(
            model_name='allcontainers',
            name='container_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
