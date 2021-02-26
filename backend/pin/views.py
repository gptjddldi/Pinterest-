import cloudinary
from django.shortcuts import render
from rest_framework import status
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from . import serializers
from .models import Pin


class PinViewSet(ModelViewSet):
    '''
    Pin 관련 REST API 제공

    ---

    search: author__following__username => 현재 유저가 following 하는 유저의 pin list 제공
    boards__id => 보드 id에 해당하는 pin List 제공
    '''
    queryset = Pin.objects.all()
    serializer_class = serializers.PinListSerializer
    filterset_fields = ['author__following__username', 'author__username', 'boards__id']

    def perform_create(self, serializer):
        print(self.request.POST)
        serializer.save(author=self.request.user)

class FollowingPinList(ListAPIView):
    '''
    현재 User 의 Following User 의 Pin List 제공

    ---



    '''
    queryset = Pin.objects.all()
    serializer_class = serializers.PinListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        query = []
        for following in self.request.user.following.all():
            query += qs.filter(author=following.pk)
        return query


class BoardPinList(ListAPIView):
    '''

    현재 user 의 Board 에 들어있는 모든 Pin List

    ---


    다른 Board 에 동일한 Pin 이 들어있을 수 있기 때문에,
    동일한 id 의 Pin 이 2개 이상 있을 수 있음
    '''
    queryset = Pin.objects.all()
    serializer_class = serializers.PinListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        query = []
        for board in self.request.user.boards.all():
            query += qs.filter(boards=board.pk)
        return query