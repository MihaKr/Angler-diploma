# Generated by Django 4.2.10 on 2024-02-10 16:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('angler_core', '0007_alter_applications_date_created_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applications',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='applications',
            name='date_last_Modified',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
