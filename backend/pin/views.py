from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Pin
from .serializers import PinListSerializer


class PinViewSet(ModelViewSet):
    queryset = Pin.objects.all()
    serializer_class = PinListSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)