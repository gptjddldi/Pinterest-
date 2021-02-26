from io import BytesIO

import cloudinary
from django.core.files import File
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from . import utils


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

    def save(self, *args, **kwargs):
        url = "https://i.pinimg.com/236x/76/d0/ce/76d0ced78f2bf72370d753afaead0d63.jpg"
        data = utils.retrieve_image(url)
        # img = utils.decode_design_image(data)
        # img_io = BytesIO()
        # img.save(img_io, format='JPEG') # img : PIL 파일임
        # img_file = InMemoryUploadedFile(img_io, field_name=None,
        #                                 name="test.jpg", content_type=img_io.tell, charset=None,size=img_io.tell)
        # img_file = ContentFile(img_io.getvalue())
        # self.image = img_file
        self.image.save("123.jpg", File(data))
        print(self.image.url)
        super().save(*args, **kwargs)