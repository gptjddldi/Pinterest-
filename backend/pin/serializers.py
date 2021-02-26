from rest_framework import serializers

from pinterestAccounts.models import Account, Board
from pinterestAccounts.serializers import BoardSerializer
from .models import Pin


class BoardSerializerR(BoardSerializer):
    class Meta:
        model = Board
        fields = ['title']


class PinListSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    boards = BoardSerializerR(many=True, required=False)
    # image = serializers.ImageField(required=True)
    class Meta:
        model = Pin
        fields = '__all__'

