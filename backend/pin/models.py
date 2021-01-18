from django.conf import settings
from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Pin(TimestampedModel):
    author = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='pins')
    title = models.CharField(max_length=100)
    image = models.ImageField(blank=True, upload_to="pins/%Y/%m/%d")


# Pin, Board: Many To Many

class Board(models.Model):
    title = models.CharField(max_length=100)
    pin = models.ManyToManyField(to=Pin, related_name='boards', blank=True)
    author = models.ManyToManyField(to=settings.AUTH_USER_MODEL, related_name='boards')
