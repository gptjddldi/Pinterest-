from django.contrib.auth.models import AbstractUser
from django.db import models

from tags.models import Tag


class Account(AbstractUser):
    avatar = models.ImageField(blank=True, upload_to="pinterestAccounts/profile/%Y/%m/%d")
    following_user = models.ManyToManyField('self', blank=True, related_name="following_users", symmetrical=False)
    following_tag = models.ManyToManyField(Tag, blank=True, related_name="users", symmetrical=False)
    follower = models.ManyToManyField('self', blank=True, related_name="followers", symmetrical=False)
    username = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True, verbose_name="이메일")

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
