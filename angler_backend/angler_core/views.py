from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Applications, ApplicationContainers
from .serializers import AnglerSerializer, AnglerAppContSerializer

#applications
# TODO dodaj get za id
# TODO dodaj delete za ID 
class AnglerListApiView(APIView):
    def get(self, request, *args, **kwargs):
        Apps = Applications.objects
        serializer = AnglerSerializer(Apps, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request, *args, **kwargs):
        serializer = AnglerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#application containers/modules
class AnglerListAppContView(APIView):

    def get(self, request, *args, **kwargs):
        app_id_q = request.query_params.get('id')

        if app_id_q:
            try:
                app_container = ApplicationContainers.objects.filter(app_id=app_id_q)
                serializer = AnglerAppContSerializer(app_container, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ApplicationContainers.DoesNotExist:
                return Response({"message": "Application Container not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"message": "ID parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        serializer = AnglerAppContSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
