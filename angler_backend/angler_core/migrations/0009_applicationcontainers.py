# Generated by Django 5.0.2 on 2024-02-11 01:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('angler_core', '0008_alter_applications_date_created_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ApplicationContainers',
            fields=[
                ('container_id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
    ]