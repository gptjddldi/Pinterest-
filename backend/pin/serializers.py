from rest_framework import serializers

from account.models import Account, Board
from account.serializers import BoardSerializer
from .models import Pin


class BoardSerializer(BoardSerializer):
    class Meta:
        model = Board
        fields = ['id',]


class PinListSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    boards = BoardSerializer(many=True)
    class Meta:
        model = Pin
        fields = '__all__'

