
from django.db.models import Q, Case, When

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from utils2 import recommend_pin
from . import serializers
from .models import Pin
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

    def list(self, request, *args, **kwargs):
        qs = self.get_queryset()
        # qs = qs.prefetch_related('author').prefetch_related('tag_set').prefetch_related('boards')
        queryset = self.filter_queryset(qs)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(methods=['get'], detail=False)
    def following_pin(self, *args, **kwargs):
        qs = self.get_queryset()
        author_list = self.request.user.following_user.all()
        tag_list = self.request.user.following_tag.all()

        # qs = qs\
        #     .select_related('author')\
        #     .prefetch_related('tag_set')\
        #     .filter(Q(author__in=author_list) | Q(tag_set__in=tag_list))\
        #     .distinct()\
        #     .order_by('-created_at')
        qs = qs.filter(Q(author__in=author_list | Q(tag_set__in=tag_list))).distinct().order_by('-created_at')
        page = self.paginate_queryset(qs)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True)
    def similar_pin(self, request, pk):
        qs = self.get_queryset().prefetch_related('author').prefetch_related('tag_set').prefetch_related('boards')
        pin = Pin.objects.get(pk=pk)
        lis = recommend_pin(pin, qs)
        # task_get_similarity.delay(pin)
        preserved = Case(*[When(pk=pk, then=position) for position, pk in enumerate(lis)])
        qs = qs.filter(id__in=lis).order_by(preserved)
        serializer = self.get_serializer(qs, many=True)

        return Response(serializer.data)
