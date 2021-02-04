from rest_framework import serializers

from account.models import Account, Board
from account.serializers import BoardSerializer
from .models import Pin


class BoardSerializerR(BoardSerializer):
    class Meta:
        model = Board
        fields = ['title']


class PinListSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    boards = BoardSerializerR(many=True)
    class Meta:
        model = Pin
        fields = '__all__'

