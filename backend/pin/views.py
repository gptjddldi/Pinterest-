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
        print('123')
        print(self.request.POST)
        serializer.save(author=self.request.user)


class FollowingPinList(ListAPIView):
    queryset = Pin.objects.all()
    serializer_class = serializers.PinListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        query = []
        for following in self.request.user.following.all():
            query += qs.filter(author=following.pk)
        return query


class BoardPinList(ListAPIView):
    queryset = Pin.objects.all()
    serializer_class = serializers.PinListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        query = []
        for board in self.request.user.boards.all():
            query += qs.filter(boards=board.pk)
        return query