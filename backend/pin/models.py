import re
from io import BytesIO

from django.core.files import File
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from tags.models import Tag
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
    image_url = models.CharField(max_length=400, blank=True)
    tag_set = models.ManyToManyField("tags.Tag", blank=True)

    def get_tags_from_title(self):
        tag_name_list = re.findall(r"#([a-zA-Z\dㄱ-힣]+)", self.title)
        tag_list = []
        for tag_name in tag_name_list:
            tag, _ = Tag.objects.get_or_create(tag_name=tag_name)  # 객체와 bool 이 리턴되므로 뒤에껀 버림
            tag_list.append(tag)
        return tag_list

    def save(self, *args, **kwargs):
        if self.image_url:
            data = utils.retrieve_image(self.image_url)
            # img = utils.decode_design_image(data)
            # img_io = BytesIO()
            # img.save(img_io, format='JPEG') # img : PIL 파일임
            # img_file = InMemoryUploadedFile(img_io, field_name=None,
            #                                 name="test.jpg", content_type=img_io.tell, charset=None,size=img_io.tell)
            # self.image = img_file
            self.image.save("gPtjddl.jpg", File(data), save=False)
            # https://stackoverflow.com/questions/12119988/django-save-a-filefield-before-calling-super

        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        self.image.storage.delete(self.image.name)
        super().delete()