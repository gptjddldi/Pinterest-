from django.contrib.auth import authenticate, login
from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from pin.models import Pin
from . import serializers
from .models import Account

#
# class AccountSignupView(CreateAPIView):
#     '''
#     회원가입 API
#
#     ---
#
#     username, password, email 3개의 parameter 받아서 처리한다.
#
#     '''
#     queryset = Account.objects.all()
#     serializer_class = serializers.AccountSignupSerializer

#
# class AccountCurrentView(ListAPIView):
#     '''
#     유저 정보 API
#
#     ---
#     로그인한 User 의 사진, 이름, 이메일, 팔로잉, 팔로워를 제공한다.
#     '''
#     queryset = Account.objects.all()
#     serializer_class = serializers.CurrentAccountSerializer
#
#     def get_queryset(self):
#         queryset = super().get_queryset()
#         queryset = queryset.filter(pk=self.request.user.id)
#         return queryset


# class SuggestionList(ListAPIView):
#     '''
#     유저 추천 API
#
#     ---
#     현재 User 가 following 하지 않는 User List 를 제공한다.
#     '''
#     queryset = Account.objects.all()
#     serializer_class = serializers.SuggestionUserSerializer
#
#     def get_queryset(self):
#         qs = super().get_queryset().exclude(pk=self.request.user.id).
#         exclude(pk__in=self.request.user.following_user.all())
#         return qs


@api_view(['GET', 'PUT'])
def get_user_info_by_username(request, username):
    '''
    Username 으로 유저 정보를 제공, 수정하는 API

    ---
    username 을 slug 로 받아 해당 user 의 사진, 이름, 이메일, 팔로잉, 팔로워를 제공한다.
    username 이 request.user.username 일 땐, 이름과 사진을 수정할 수 있다.(PUT)
    '''
    user = get_object_or_404(Account, username=username)
    serializer = serializers.CurrentAccountSerializer(user)
    if request.method == 'PATCH':
        if request.user.username == username:
            if request.data['username']:
                username = request.data['username']
                user.username = username
            try:
                avatar = request.data['avatar']
                user.avatar = avatar
            except KeyError:  # avatar element 가 없는 경우 pass 이렇게 처리하는 게 맞나?
                pass

            user.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response(serializer.data)


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


class PasswordChangeView(UpdateAPIView):
    '''
    비밀번호 변경 API

    ---
    old_password, new_password1, new_password2 를 받아 validation check 를 한 뒤 비밀번호를 변경한다.
    '''
    serializer_class = serializers.PasswordChangeSerializer

    def update(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


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


@api_view(['POST', 'GET'])
def login_user(request):
    print(request.data)
    password = request.data['password']
    email = request.data['email']
    user = authenticate(request, email=email, password=password)
    if user is not None:
        login(request, user)
    return Response(status.HTTP_200_OK)


class FollowingList(ListAPIView):
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
