import cloudinary
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
