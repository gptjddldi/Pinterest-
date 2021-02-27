from django.apps import AppConfig


class PinConfig(AppConfig):
    name = 'pin'

    def ready(self):
        from .signals import insert_tags