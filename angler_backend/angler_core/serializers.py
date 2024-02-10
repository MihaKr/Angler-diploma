from rest_framework import serializers
from .models import Applications
class AnglerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applications
        fields = ["app_id", "app_name", "owner", "date_created", "date_last_Modified"]