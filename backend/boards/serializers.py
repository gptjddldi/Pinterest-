from rest_framework import serializers

from boards.models import Board
from pin.models import Pin


class PinSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pin
        fields = ['title', 'image', 'author']


class BoardSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    pin = PinSerializer(many=True, required=False)

    class Meta:
        model = Board
        fields = ['id', 'title', 'author', 'pin']

    # def update(self, instance, validated_data):
    #     pin_data = validated_data.pop('pin')
    #     pin = instance.pin