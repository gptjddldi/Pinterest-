from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


class AccountManager(BaseUserManager):
    pass


class Account(AbstractUser):
    avatar = models.BinaryField()
    first_name = models.CharField(max_length=10, verbose_name="성", blank=True)
    last_name = models.CharField(max_length=20, verbose_name="이름", blank=True)
    username = models.CharField(max_length=20)
    email = models.EmailField(unique=True, verbose_name="이메일")
    bio = models.TextField(verbose_name="프로필 정보", blank=True)
    url = models.TextField(verbose_name="웹사이트 URL", blank=True)
    location = models.TextField(verbose_name="위치", blank=True)
# interest : Pin many to many field
# follow : User many to many field

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username']