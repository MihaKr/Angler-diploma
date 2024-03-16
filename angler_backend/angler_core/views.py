from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Applications, ApplicationContainers, AllContainers
from .serializers import AnglerSerializer, AnglerAppContSerializer, AllContainersSerializer

#TODO: update za app containers
#applications
class AnglerListApiView(APIView):
    def get(self, request, *args, **kwargs):
        app_id_q = request.query_params.get('id')

        if app_id_q:
            try:
                app = Applications.objects.filter(app_id=app_id_q)
                serializer = AnglerSerializer(app, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ApplicationContainers.DoesNotExist:
                return Response({"message": "Application Container not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            apps = Applications.objects
            serializer = AnglerSerializer(apps, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request, *args, **kwargs):
        serializer = AnglerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        app_id_q = request.query_params.get('id')

        app_get = Applications.objects.filter(app_id=app_id_q)
        app_get.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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

    def put(self, request, *args, **kwargs):
        app_id_q = request.query_params.get('id')
        app_cont_id_q = request.query_params.get('app_cont_id')

        cont = ApplicationContainers.objects.filter(app_id=app_id_q,
                                                    app_container_id=app_cont_id_q).first()
        print(cont)
        print(app_id_q)
        print(app_cont_id_q)

        if cont:
            # Update specific field with app_container_id
            new_value = request.data.get('position_x')
            cont.position_x = new_value

            new_value = request.data.get('position_y')
            cont.position_y = new_value

            cont.save()

            serializer = AnglerAppContSerializer(cont)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)

class AnglerListAllContView(APIView):
    def get(self, request, *args, **kwargs):
        apps = AllContainers.objects
        serializer = AllContainersSerializer(apps, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)