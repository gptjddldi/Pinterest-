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
        serializer.save(author=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        serializer = self.get_serializer(instance)
        new_dict = {'image_w_502': cloudinary.utils.cloudinary_url(str(instance.image), width=502)[0]}

        new_dict.update(serializer.data)

        return Response(new_dict)




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
