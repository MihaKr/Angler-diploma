from django.db import models
from django.utils import timezone

# Create your models here.

class Applications(models.Model):
    app_id = models.AutoField(primary_key=True)
    app_name = models.CharField(max_length=30)
    owner = models.CharField(max_length=30)
    date_created = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    date_last_Modified = models.DateTimeField(auto_now_add=True, null=True, blank=True)

