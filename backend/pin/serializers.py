from rest_framework import serializers

from boards.models import Board
from boards.serializers import BoardSerializer
from tags.models import Tag
from .models import Pin


class BoardSerializerR(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['title']

class TagSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['tag_name', 'id']


class PinListSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    boards = BoardSerializerR(many=True, required=False)
    tag_set = TagSetSerializer(many=True, required=False)
    # image = serializers.ImageField(required=True)
    class Meta:
        model = Pin
        fields = '__all__'

