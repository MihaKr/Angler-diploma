from rest_framework import serializers
from .models import Applications, ApplicationContainers
class AnglerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applications
        fields = ["app_id", "app_name", "owner", "date_created", "date_last_Modified"]
class AnglerAppContSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationContainers
        fields = ["app_container_id", "container_id", "app_id", "prev_container", "next_container", "position_x", "position_y" ]
