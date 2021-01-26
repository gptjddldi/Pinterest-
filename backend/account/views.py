from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_jwt.views import JSONWebTokenAPIView

from pin.models import Pin
from . import serializers
from .models import Account, Board


class AccountSignupView(CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = serializers.AccountSignupSerializer


class AccountCurrentView(ListAPIView):
    queryset = Account.objects.all()
    serializer_class = serializers.CurrentAccountSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(pk=self.request.user.id)
        return queryset


class SuggestionList(ListAPIView):
    queryset = Account.objects.all()
    serializer_class = serializers.SuggestionUserSerializer

    def get_queryset(self):
        qs = super().get_queryset().exclude(pk=self.request.user.id).exclude(pk__in=self.request.user.following.all())
        return qs


# class BoardCreateListView(ListAPIView, CreateAPIView):
#     queryset = Board.objects.all()
#     serializer_class = serializers.BoardSerializer
#
#     def get_queryset(self):
#         qs = super().get_queryset().filter(author=self.request.user)
#         return qs
#
#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)
#
#


class BoardViewSet(ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = serializers.BoardSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset().filter(author=self.request.user)
        print(self.request.data)
        return qs


@api_view(['POST', 'GET'])
def add_pin(request, pk):
    if request.method == 'POST':
        board = get_object_or_404(Board, pk=pk)
        board.pin.add(Pin.objects.get(pk=request.data['id']))
    # board.pin.add(pk=request.pin.pk)
    return Response(status.HTTP_202_ACCEPTED)


@api_view(['GET', 'PUT'])
def get_user_info_by_username(request, username):
    user = get_object_or_404(Account, username=username)
    serializer = serializers.CurrentAccountSerializer(user)
    if request.method == 'PUT':
        username = request.data['username']
        avatar = request.data['avatar']
        user.username = username
        user.avatar = avatar
        user.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    return Response(serializer.data)
