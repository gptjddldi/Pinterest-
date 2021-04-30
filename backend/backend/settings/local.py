from .base import *

INSTALLED_APPS += ['debug_toolbar']

INTERNAL_IPS = ['127.0.0.1']

MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "postgres",
        'USER': get_secret("USER"),
        'PASSWORD': get_secret("PASSWORD"),
        'HOST': get_secret("HOST"),
    }
}