from rest_framework import serializers

from tags.models import Tag


class TagSerializer(serializers.ModelSerializer):
    pins = serializers.ReadOnlyField(source='pin.title')
    # author = serializers.ReadOnlyField(source='users.username')
    class Meta:
        model = Tag
        fields = '__all__'