from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from tags.models import Tag
from tags.serializers import TagSerializer


class TagViewSet(ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filterset_fields = ['users__username']
    @action(methods=['POST'], detail=True)
    def follow_tag(self, request, pk):
        target_tag = get_object_or_404(Tag, id=pk)
        self.request.user.following_tag.add(target_tag)
        return Response(status=status.HTTP_201_CREATED)

    @action(methods=['POST'], detail=True)
    def unfollow_tag(self, request, pk):
        target_tag = get_object_or_404(Tag, id=pk)
        self.request.user.following_tag.remove(target_tag)
        return Response(status=status.HTTP_202_ACCEPTED)