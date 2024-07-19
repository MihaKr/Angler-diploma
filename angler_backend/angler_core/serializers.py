from rest_framework import serializers
from .models import Applications, ApplicationContainers, AllContainers, LinkContainers, Files
class AnglerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applications
        fields = ["app_id", "app_name", "owner", "date_created", "app_date_last_Modified"]
class AnglerAppContSerializer(serializers.ModelSerializer):
    position = serializers.SerializerMethodField()

    class Meta:
        model = ApplicationContainers
        fields = ["app_container_id", "container_id", "app_id", "position", "arguments"]

    def get_position(self, obj):
        return {"x": obj.position_x, "y": obj.position_y}

class AllContainersSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllContainers
        fields = ["container_id", "container_name", "container_group"]

class LinkContainersSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkContainers
        fields = ["link_id","app_id", "origin", "origin_edge", "destination", "destination_edge"]

class RunAppSerializer:
    class Meta:
        model = Applications
        fields = ["app_id"]

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ["file_id", "file", "app_container_id"]