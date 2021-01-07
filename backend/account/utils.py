from . import serializers


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': serializers.CurrentAccountSerializer(user, context={'request': request}).data
    }