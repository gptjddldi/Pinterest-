from rest_framework import serializers

from account.models import Account
from .models import Pin


class PinListSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Pin
        fields = '__all__'

