from rest_framework import serializers
from .models import Pin


class PinListSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.email')

    class Meta:
        model = Pin
        fields = '__all__'

