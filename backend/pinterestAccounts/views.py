from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.response import Response

import tags
from tags.models import Tag
from tags.serializers import TagSerializer
from . import serializers
from .models import Account


class GetUserInfoByUsername(UpdateAPIView, RetrieveAPIView):
    '''
        Username 으로 유저 정보를 제공, 수정하는 API

        ---
        username 을 slug 로 받아 해당 user 의 사진, 이름, 이메일, 팔로잉, 팔로워를 제공한다.
        username 이 request.user.username 일 땐, 이름과 사진을 수정할 수 있다.(PUT or PATCH)
        '''
    serializer_class = serializers.CurrentAccountSerializer
    queryset = Account.objects.all()
    lookup_field = 'username'


@api_view(['POST'])
def follow_user(request):
    username = request.data['username']
    target_user = get_object_or_404(Account, username=username)
    request.user.following_user.add(target_user)
    target_user.follower.add(request.user)
    return Response(status.HTTP_202_ACCEPTED)


@api_view(['POST'])
def unfollow_user(request):
    username = request.data['username']
    target_user = get_object_or_404(Account, username=username)
    request.user.following_user.remove(target_user)
    target_user.follower.remove(request.user)
    return Response(status.HTTP_202_ACCEPTED)


class FollowingUserList(ListAPIView):
    '''
    Following User View

    ---
    현재 User 가 following 하는 User List 를 제공한다.
    '''
    queryset = Account.objects.all()
    serializer_class = serializers.FollowingUserSerializer

    def get_queryset(self):
        qs = super().get_queryset().filter(pk__in=self.request.user.following_user.all())
        return qs


class FollowingTagList(ListAPIView):
    '''
    Following Tag View

    ---
    현재 User 가 Following 하는 Tag List 를 제공하는데.. 여기에 정의하는 게 맞나.. 아니면 Tag 에 정의해야 하나..
    '''
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def get_queryset(self):
        qs = super().get_queryset().filter(users__username=self.request.user.username);
        return qs