from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models

from pin.models import Pin


class AccountManager(BaseUserManager):
    pass


class Account(AbstractUser):
    avatar = models.ImageField(blank=True, upload_to="account/profile/%Y/%m/%d")
    # image 를 db에 저장할 것인가? 아니면 파일 시스템에 저장할 것인가?
    # https://stackoverflow.com/questions/3748/storing-images-in-db-yea-or-nay
    # https://softwareengineering.stackexchange.com/questions/150669/is-it-a-bad-practice-to-store-large-files-10-mb-in-a-database
    following = models.ManyToManyField('self', blank=True, related_name="followings", symmetrical=False)
    follower = models.ManyToManyField('self', blank=True, related_name="followers", symmetrical=False)
    first_name = models.CharField(max_length=10, verbose_name="성", blank=True)
    last_name = models.CharField(max_length=20, verbose_name="이름", blank=True)
    username = models.CharField(max_length=20)
    email = models.EmailField(unique=True, verbose_name="이메일")
    bio = models.TextField(verbose_name="프로필 정보", blank=True)
    url = models.TextField(verbose_name="웹사이트 URL", blank=True)
    location = models.TextField(verbose_name="위치", blank=True)
# follow : User many to many field

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

# <img src = "data: image / png; base64, {{image}}">


class Board(models.Model):
    author = models.ForeignKey(to=Account, on_delete=models.CASCADE, related_name='boards')
    title = models.CharField(max_length=100)
    pin = models.ManyToManyField(to=Pin, related_name='boards', blank=True)
