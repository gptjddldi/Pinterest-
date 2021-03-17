from rest_framework_jwt.compat import PasswordField
from rest_framework import serializers

from boards.serializers import BoardSerializer
from .models import Account


class CurrentAccountSerializer(serializers.ModelSerializer):
    boards = BoardSerializer(many=True)

    class Meta:
        model = Account
        fields = ['id', 'avatar', 'username', 'email', 'following_user', 'following_tag', 'follower', 'boards']
        lookup_field = 'username'


class FollowingUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['username', 'avatar']
