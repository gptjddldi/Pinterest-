from rest_framework import serializers

from boards.models import Board
from tags.models import Tag
from .models import Pin


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['title']


class TagSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['tag_name', 'id']


class PinListSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    boards = BoardSerializer(many=True, required=False)
    tag_set = TagSetSerializer(many=True, required=False)

    class Meta:
        model = Pin
        fields = '__all__'

