from django.db import models
from django.utils import timezone

# Create your models here.

class Applications(models.Model):
    class Meta:
        app_label = 'angler_core'
    app_id = models.AutoField(primary_key=True)
    app_name = models.CharField(max_length=30)
    owner = models.CharField(max_length=30)
    date_created = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    app_date_last_Modified = models.DateTimeField(auto_now_add=True, null=True, blank=True)

class ApplicationContainers(models.Model):
    class Meta:
        app_label = 'angler_core'
    app_container_id = models.AutoField(primary_key=True)
    app_id = models.IntegerField(blank=True, null=True)
    container_id = models.IntegerField(blank=True, null=True)
    position_x = models.IntegerField(blank=True, null=True)
    position_y = models.IntegerField(blank=True, null=True)
    arguments = models.JSONField(blank=True, null=True)

class AllContainers(models.Model):
    class Meta:
        app_label = 'angler_core'
    container_id = models.AutoField(primary_key=True, unique=True,)
    container_name = models.CharField(max_length=100)
    container_group = models.CharField(max_length=100, default="Core")

class LinkContainers(models.Model):
    class Meta:
        app_label = 'angler_core'
    link_id = models.AutoField(primary_key=True, unique=True)
    app_id =  models.IntegerField(blank=True, null=True)
    origin = models.IntegerField(blank=True, null=True)
    origin_edge = models.CharField(max_length=10)
    destination = models.IntegerField(blank=True, null=True)
    destination_edge = models.CharField(max_length=10)

class Files(models.Model):
    class Meta:
        app_label = 'angler_core'
    file_id = models.AutoField(primary_key=True, unique=True)
    app_container_id = models.IntegerField(blank=True, null=True)
    file = models.FileField(upload_to='documents/')





