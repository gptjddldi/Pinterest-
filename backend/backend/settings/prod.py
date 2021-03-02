from .base import *
import cloudinary
DEBUG = False

STATICFILES_STORAGE = "backend.storages.StaticAzureStorage"
DEFAULT_FILE_STORAGE = "backend.storages.MediaAzureStorage"
AZURE_ACCOUNT_NAME = get_secret("AZURE_ACCOUNT_NAME")
AZURE_ACCOUNT_KEY = get_secret("AZURE_ACCOUNT_KEY")

# CLOUDINARY_STORAGE = {
#     "CLOUD_NAME": get_secret("CLOUD_NAME"),
#     "API_SECRET": get_secret("API_SECRET"),
#     "API_KEY":  get_secret("API_KEY")
# }
# cloudinary.config(cloud_name=get_secret("CLOUD_NAME"),
#                   api_key=get_secret("API_KEY"),
#                   api_secret=get_secret("API_SECRET"))
ALLOWED_HOSTS += ['gptjddl123.azurewebsites.net']

# CORS_ALLOWED_ORIGINS = os.environ.get("CORS_ALLOWED_ORIGINS", "").split(",")
CORS_ALLOW_ALL_ORIGINS = True

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "postgres",
        'USER': get_secret("USER"),
        'PASSWORD': get_secret("PASSWORD"),
        'HOST': get_secret("HOST"),
    }
}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "level": "ERROR",
            "class": "logging.StreamHandler",
        }
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "ERROR"
        }
    }
}