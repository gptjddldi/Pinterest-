from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework_jwt.views import JSONWebTokenAPIView

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


class BoardCreateListView(ListAPIView, CreateAPIView):
    queryset = Board.objects.all()
    serializer_class = serializers.BoardSerializer

    def get_queryset(self):
        qs = super().get_queryset().filter(author=self.request.user)
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

