from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator

from boards.models import Board
from pin.models import Pin
from pinterestAccounts.models import Account


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

    # def validate_title(self, title):
    #     if len(title):
    #         print(title)
    #         pass
    #     else:
    #         msg = "제목을 입력해주세요."
    #         raise ValidationError(msg)
    #     return title

    def validate(self, attrs):
        '''
        생성한 보드가 현재 로그인한 유저가 가진 보드의 이름과 중복되면 에러 발생

        :param attrs:
        :return:
        '''
        author = self.context['request'].user
        title = attrs.get('title')
        qs = Board.objects.all()
        qs = qs.filter(author=author)
        for Obj in qs:
            if title in Obj.title:
                msg = {"board": "이미 존재하는 보드의 이름입니다. 다른 이름을 입력해주세요."}
                raise ValidationError(msg)
        return attrs

# self.context["request"].parser_context["kwargs"] 로 url parameter 도 가져올 수 있다고 한다.
