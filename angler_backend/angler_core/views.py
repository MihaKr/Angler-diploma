import os
import shutil
from datetime import datetime

from django.core.files.storage import default_storage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import datetime
from django.conf import settings
from django.utils.timezone import make_aware

from .models import Applications, ApplicationContainers, AllContainers, LinkContainers, Files
from .serializers import AnglerSerializer, AnglerAppContSerializer, AllContainersSerializer, LinkContainersSerializer, \
    FileSerializer
from django.shortcuts import get_object_or_404


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

    def put(self, request, *args, **kwargs):
        app_id_q = request.query_params.get('id')

        app = Applications.objects.get(app_id=app_id_q)

        if app:
            if request.data['new_date'] is not None:
                settings.TIME_ZONE  # 'UTC'
                format_string = '%Y-%m-%d %H:%M:%S'


                naive_datetime = datetime.datetime.strptime(request.data.get('new_date'), format_string)

                new_date = make_aware(naive_datetime)
                app.app_date_last_modified = new_date
                app.save()

                serializer = AnglerSerializer(app)
                return Response(serializer.data, status=status.HTTP_200_OK)
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
        data_new = request.data
        serializer = AnglerAppContSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            instance.arguments = {"app_cont_id": str(instance.app_container_id)}
            instance.save()

            response_data = serializer.data
            response_data['arguments'] = {"app_cont_id":  str(instance.app_container_id)}

            return Response(response_data, status=status.HTTP_201_CREATED)
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
                cont.position['x'] = cont_pos['x']
                cont.position['y']= cont_pos['y']

                cont.save()

                serializer = AnglerAppContSerializer(cont)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print("none")
        elif args:
            if request.data['FILEPATH'] :
                try:
                    shutil.copyfile(request.data['FILEPATH'], '/mnt/docker_host/into_text.txt')
                except Exception as e:
                    print(f"Error occurred while copying and renaming file: {e}")
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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LinkContainersView(APIView):
    def get(self, request, *args, **kwargs):
        app_id_q = request.query_params.get('id')

        if app_id_q:
            try:
                links = LinkContainers.objects.filter(app_id=app_id_q)
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
        return Response({"message": "app_accepted"}, status=status.HTTP_200_OK)

class FileView(APIView):
    def put(self, request, *args, **kwargs):
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            file = request.FILES.get('file')
            name = request.data.get('name')

            if not file or not name:
                return Response({'error': 'File or name is missing'}, status=status.HTTP_400_BAD_REQUEST)

            path = os.path.join('../containers', name)
            if not os.path.exists(path):
                os.makedirs(path)
            destination_path = os.path.join(path, file.name)

            with open(destination_path, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
            return Response({'message': 'File uploaded successfully'}, status=status.HTTP_201_CREATED)

    def post(self, request, *args, **kwargs):
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid() or request.FILES['file'].content_type == 'text/x-python-script':
            if 'app_container_id' in request.data:
                print('app_container_id not missing')
                file_instance = serializer.save()
                file = request.FILES.get('file')
                if file.name == 'into_text.conllu':
                    if request.data['store'] == 1:
                        destination_path = os.path.join('/mnt/docker_host/', request.data['store_as'], '.conllu')
                        with open(destination_path, 'wb+') as destination:
                            for chunk in file.chunks():
                                destination.write(chunk)
                                print("printed")

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                file = request.FILES.get('file')
                name = request.data.get('name')

                if not file or not name:
                    return Response({'error': 'File or name is missing'}, status=status.HTTP_400_BAD_REQUEST)

                path = os.path.join('../containers', name)
                if not os.path.exists(path):
                    os.makedirs(path)

                if file.name == 'config.tsx':
                    destination_path = os.path.join('/mnt/frontend/app/configs/', f'{name}.tsx')
                else:
                    destination_path = os.path.join(path, file.name)

                with open(destination_path, 'wb+') as destination:
                    for chunk in file.chunks():
                        destination.write(chunk)
                return Response({'message': 'File uploaded successfully'}, status=status.HTTP_201_CREATED)

        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request, *args, **kwargs):
        app_cont_id = request.query_params.get('app_cont_id')
        if app_cont_id:
            try:
                file_tmp = Files.objects.filter(app_container_id=app_cont_id).first()
                document = get_object_or_404(Files, file_id=file_tmp.file_id)
                file_path = document.file.path
                with open(file_path, 'r') as file:
                    file_content = file.read()
                    return Response({'file_content': file_content}, status=status.HTTP_200_OK)

                return Response(serializer.data, status=status.HTTP_200_OK)
            except ApplicationContainers.DoesNotExist:
                return Response({"message": "Application Container not found"}, status=status.HTTP_404_NOT_FOUND)


'''class ContainerArguments(APIView):

    def get'''
