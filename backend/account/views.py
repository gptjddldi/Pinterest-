from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework_jwt.views import JSONWebTokenAPIView

from . import serializers
from .models import Account


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

# class AccountLoginView(JSONWebTokenAPIView):

