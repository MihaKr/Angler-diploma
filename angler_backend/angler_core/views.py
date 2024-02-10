from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Applications
from .serializers import AnglerSerializer

class AnglerListApiView(APIView):
    # add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    # 1. List all
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