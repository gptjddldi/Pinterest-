from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models

from pin.models import Pin
from tags.models import Tag


class AccountManager(BaseUserManager):
    pass


class Account(AbstractUser):
    avatar = models.ImageField(blank=True, upload_to="pinterestAccounts/profile/%Y/%m/%d")
    following_user = models.ManyToManyField('self', blank=True, related_name="following_users", symmetrical=False)
    following_tag = models.ManyToManyField(Tag, blank=True, related_name="following_tags", symmetrical=False)
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

    def __str__(self):
        return self.username
