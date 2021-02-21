from django.contrib.auth import password_validation
from rest_framework_jwt.compat import PasswordField
from rest_framework_jwt.settings import api_settings

from pin.models import Pin
from .models import Account, Board

from rest_framework import serializers

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class AccountSignupSerializer(serializers.ModelSerializer):
    password = PasswordField(write_only=True)

    class Meta:
        model = Account
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Account(**validated_data)
        user.set_password(password)
        user.save()
        return user


class CurrentAccountSerializer(serializers.ModelSerializer):
    # following = (many=True)
    class Meta:
        model = Account
        fields = ['id', 'avatar', 'username', 'email', 'following', 'follower']


# class AccountLoginSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Account
#         fields = ['email', 'password']
#
#     def validate(self, attrs):
#         credentials = {
#             self.username_field: attrs.get(self.username_field),
#             'password': attrs.get('password')
#         }
#
#         if all(credentials.values()):
#             user = authenticate(**credentials)
#
#             if user:
#                 if not user.is_active:
#                     msg = 'User pinterestAccounts is disabled.'
#                     raise serializers.ValidationError(msg)
#
#                 payload = jwt_payload_handler(user)
#
#                 return {
#                     'token': jwt_encode_handler(payload),
#                     'user': user
#                 }
#             else:
#                 msg = 'Unable to log in with provided credentials.'
#                 raise serializers.ValidationError(msg)
#         else:
#             msg = 'Must include "{username_field}" and "password".'
#             msg = msg.format(username_field=self.username_field)
#             raise serializers.ValidationError(msg)


class SuggestionUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['username', 'avatar']


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


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=128, write_only=True, required=True)
    new_password1 = serializers.CharField(max_length=128, write_only=True, required=True)
    new_password2 = serializers.CharField(max_length=128, write_only=True, required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError(
                '현재 비밀번호가 정확하지 않습니다. 다시 확인해주세요.'
            )
        return value

    def validate(self, attrs):
        if attrs['new_password1'] != attrs['new_password2']:
            raise serializers.ValidationError('두 비밀번호가 일치하지 않습니다. 다시 확인해주세요.')
        password_validation.validate_password(attrs['new_password1'], self.context['request'].user)
        return attrs

    def save(self, **kwargs):
        password = self.validated_data['new_password1']
        user = self.context['request'].user
        user.set_password(password)
        user.save()
        return user

    # def save(self, **kwargs):
    #     password = self.cleaned_data["new_password1"]
    #     user = Account(**kwargs)
    #     user.set_password(password)
    #     user.save()
    #     return self.user