from django.conf import settings
from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Pin(TimestampedModel):
    author = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='pins')
    title = models.CharField(max_length=30)
    image = models.ImageField(blank=True, upload_to="pins/%Y/%m/%d")
    tag_set = models.ManyToManyField(to='Tag', blank=True)


# Pin, Tag: Many To Many


class Tag(models.Model):
    tag = models.CharField(max_length=50, blank=True)
