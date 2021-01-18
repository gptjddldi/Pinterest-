from rest_framework import serializers
from .models import Pin


class PinListSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.email')

    class Meta:
        model = Pin
        fields = '__all__'


class FollowingPinListSerializer(serializers.ModelSerializer):
    # author = serializers.ReadOnlyField(source='author.pk')

    class Meta:
        model = Pin
        fields = '__all__'

