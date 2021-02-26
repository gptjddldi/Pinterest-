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

    # def clean(self):
    #     if self.image.url:
    #         self.image.url = cloudinary.utils.cloudinary_url(str(self.image), width=502)[0]
    #         print(self.image.url)

    #
    # def save(self, force_insert=False, force_update=False, using=None,
    #          update_fields=None):
    #     self.image.url = cloudinary.utils.cloudinary_url(str(self.image), width=502)[0]
    #     super().save(self, force_insert=False, force_update=False, using=None,
    #          update_fields=None)
