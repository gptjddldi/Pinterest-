from django.contrib.auth import authenticate
from rest_framework_jwt.compat import PasswordField
from rest_framework_jwt.settings import api_settings

from .models import Account

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
    class Meta:
        model = Account
        exclude = ['password']


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
#                     msg = 'User account is disabled.'
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
        fields = ['username', 'avatar', 'pins']