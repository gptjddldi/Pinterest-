from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Pin


@receiver(post_save, sender=Pin)
def insert_tags(sender, instance, created, **kwargs):
    if created:
        for name in Pin.get_tags_from_title(instance):
            instance.tag_set.add(name)

