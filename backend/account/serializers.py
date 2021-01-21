from django.contrib.auth import authenticate
from rest_framework_jwt.compat import PasswordField
from rest_framework_jwt.settings import api_settings

from pin.models import Pin
from pin.serializers import PinListSerializer
from .models import Account, Board

from rest_framework import serializers

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


# class Base64ImageField(serializers.ImageField):
#     """
#     A Django REST framework field for handling image-uploads through raw post data.
#     It uses base64 for encoding and decoding the contents of the file.
#
#     Heavily based on
#     https://github.com/tomchristie/django-rest-framework/pull/1268
#
#     Updated for Django REST framework 3.
#     """
#
#     def to_internal_value(self, data):
#         from django.core.files.base import ContentFile
#         import base64
#         import six
#         import uuid
#
#         # Check if this is a base64 string
#         if isinstance(data, six.string_types):
#             # Check if the base64 string is in the "data:" format
#             if 'data:' in data and ';base64,' in data:
#                 # Break out the header from the base64 content
#                 header, data = data.split(';base64,')
#
#             # Try to decode the file. Return validation error if it fails.
#             try:
#                 decoded_file = base64.b64decode(data)
#             except TypeError:
#                 self.fail('invalid_image')
#
#             # Generate file name:
#             file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
#             # Get the file name extension:
#             file_extension = self.get_file_extension(file_name, decoded_file)
#
#             complete_file_name = "%s.%s" % (file_name, file_extension, )
#
#             data = ContentFile(decoded_file, name=complete_file_name)
#
#         return super(Base64ImageField, self).to_internal_value(data)
#
#     def get_file_extension(self, file_name, decoded_file):
#         import imghdr
#
#         extension = imghdr.what(file_name, decoded_file)
#         extension = "jpg" if extension == "jpeg" else extension
#
#         return extension


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
