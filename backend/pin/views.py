from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from . import serializers
from .models import Pin


class PinViewSet(ModelViewSet):
    queryset = Pin.objects.all()
    serializer_class = serializers.PinListSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class FollowingPinList(ListAPIView):
    queryset = Pin.objects.all()
    serializer_class = serializers.FollowingPinListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        query = []
        for following in self.request.user.following.all():
            query += qs.filter(author=following.pk)
        return query
