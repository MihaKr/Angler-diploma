from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from docker_manager.add_new_container import run_add_new_container
from .models import Applications, ApplicationContainers, AllContainers, LinkContainers
from .serializers import AnglerSerializer, AnglerAppContSerializer, AllContainersSerializer, LinkContainersSerializer, RunAppSerializer

from .sql_test import run_app_func


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
            app_container = ApplicationContainers.objects
            serializer = AnglerAppContSerializer(app_container, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

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
        args = ApplicationContainers.objects.filter(app_container_id=app_cont_id_q).first()

        if cont:
            if request.data['position']['x'] is not None:
                print(request.data.get('position'))
                cont_pos = request.data.get('position')
                cont.position_x = cont_pos['x']
                cont.position_y = cont_pos['y']

                cont.save()

                serializer = AnglerAppContSerializer(cont)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print("none")
        elif args:
            print(request.data)
            print(args)
            args.arguments = request.data
            args.save()
            serializer = AnglerAppContSerializer(args)
            return Response(serializer.data, status=status.HTTP_200_OK)

        else:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        cont_id = request.data.get('app_container_id')

        to_be_deleted = ApplicationContainers.objects.filter(app_container_id=cont_id)

        if to_be_deleted:
            to_be_deleted.delete()
            return Response({"message": "Object deleted successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Object not found."}, status=status.HTTP_404_NOT_FOUND)

class AnglerListAllContView(APIView):
    def get(self, request, *args, **kwargs):
        app_id_q = request.query_params.get('cont_id')

        if app_id_q:
            try:
                container = AllContainers.objects.filter(container_id=app_id_q)
                serializer = AllContainersSerializer(container, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except AllContainers.DoesNotExist:
                return Response({"message": "Application Container not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            apps = AllContainers.objects
            serializer = AllContainersSerializer(apps, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = AllContainersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            run_add_new_container(request.data["container_name"], request.data["container_path"])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LinkContainersView(APIView):
    def get(self, request, *args, **kwargs):
        app_id_q = request.query_params.get('id')

        if app_id_q:
            try:
                links = LinkContainers.objects.filter(app_id_link=app_id_q)
                serializer = LinkContainersSerializer(links, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ApplicationContainers.DoesNotExist:
                return Response({"message": "Application Container not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            links = LinkContainers.objects
            serializer = LinkContainersSerializer(links, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request, *args, **kwargs):
        serializer = LinkContainersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        origin_q = request.data.get('origin')
        origin_e_q = request.data.get('origin_edge')
        destination_q = request.data.get('destination')
        destination_e_q = request.data.get('destination_edge')


        to_be_deleted = LinkContainers.objects.filter(origin = origin_q,
                                                      origin_edge = origin_e_q,
                                                      destination = destination_q,
                                                      destination_edge = destination_e_q).first()

        if to_be_deleted:
            to_be_deleted.delete()
            return Response({"message": "Object deleted successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Object not found."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        origin_q_old = request.data.get('origin_old')
        origin_e_q_old = request.data.get('origin_edge_old')
        destination_q_old = request.data.get('destination_old')
        destination_e_q_old = request.data.get('destination_edge_old')

        origin_q_new = request.data.get('origin_new')
        origin_e_q_new = request.data.get('origin_edge_new')
        destination_q_new = request.data.get('destination_new')
        destination_e_q_new= request.data.get('destination_edge_new')

        to_be_updated = LinkContainers.objects.filter(origin=origin_q_old,
                                                      origin_edge=origin_e_q_old,
                                                      destination=destination_q_old,
                                                      destination_edge=destination_e_q_old).first()

        if to_be_updated:
            print(to_be_updated)
            to_be_updated.destination = destination_q_new
            to_be_updated.destination_edge = destination_e_q_new

            to_be_updated.save()
            serializer = LinkContainersSerializer(to_be_updated)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)

class RunAppView(APIView):
    def post(self, request, *args, **kwargs):
        x = request.data.get("app_id")
        run_app_func(x)
        return Response({"mes sage": "app_accepted"}, status=status.HTTP_200_OK)


'''class ContainerArguments(APIView):

    def get'''
