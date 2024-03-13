from django.db import models
from django.utils import timezone

# Create your models here.

class Applications(models.Model):
    app_id = models.AutoField(primary_key=True)
    app_name = models.CharField(max_length=30)
    owner = models.CharField(max_length=30)
    date_created = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    date_last_Modified = models.DateTimeField(auto_now_add=True, null=True, blank=True)

class ApplicationContainers(models.Model):
    app_container_id = models.AutoField(primary_key=True)
    app_id = models.IntegerField(blank=True, null=True)
    container_id = models.IntegerField(blank=True, null=True)
    prev_container = models.IntegerField(blank=True, null=True)
    next_container = models.IntegerField(blank=True, null=True)
    position_x = models.IntegerField(blank=True, null=True)
    position_y = models.IntegerField(blank=True, null=True)

class AllContainers(models.Model):
    container_id = models.AutoField(primary_key=True, unique=True)
    container_name = models.CharField(max_length=100)