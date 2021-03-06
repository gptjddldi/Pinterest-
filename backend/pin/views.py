import cloudinary
from django.db.models import Q
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from . import serializers
from .models import Pin
# from .pagination import CustomLimitOffsetPagination
from .pagination import CustomCursorPagination


class PinViewSet(ModelViewSet):
    '''
    Pin 관련 REST API 제공

    ---

    search: author__following__username => 현재 유저가 following 하는 유저의 pin list 제공
    boards__id => 보드 id에 해당하는 pin List 제공
    '''
    queryset = Pin.objects.all()
    serializer_class = serializers.PinListSerializer
    filterset_fields = ['author__follower__username', 'author__username', 'boards__title']
    pagination_class = CustomCursorPagination

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(methods=['get'], detail=False)
    def following_pin_list(self, *args, **kwargs):
        qs = self.filter_queryset(self.get_queryset())
        author_list = self.request.user.following_user.all()
        tag_list = self.request.user.following_tag.all()

        qs = qs.filter(Q(author__in=author_list) | Q(tag_set__in=tag_list)).distinct().order_by('-created_at')
        page = self.paginate_queryset(qs)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


# class BoardPinList(ListAPIView):
#     '''
#
#     현재 user 의 Board 에 들어있는 모든 Pin List
#
#     ---
#
#
#     다른 Board 에 동일한 Pin 이 들어있을 수 있기 때문에,
#     동일한 id 의 Pin 이 2개 이상 있을 수 있음
#     '''
#     queryset = Pin.objects.all()
#     serializer_class = serializers.PinListSerializer
#
#     def get_queryset(self):
#         qs = super().get_queryset()
#         query = []
#         for board in self.request.user.boards.all():
#             query += qs.filter(boards=board.pk)
#         return query
