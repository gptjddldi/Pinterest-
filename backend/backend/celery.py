import os
from celery import Celery
from redis.connection import SSLConnection

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.prod')

celery_app = Celery('backend')
celery_app.config_from_object('django.conf:settings', namespace='CELERY')
celery_app.autodiscover_tasks()

if celery_app.conf.broker_use_ssl:
    celery_app.backend.connparams.update(celery_app.conf.broker_use_ssl)
    celery_app.backend.connparams['connection_class'] = SSLConnection


@celery_app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')