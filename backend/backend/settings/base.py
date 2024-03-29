import datetime
import json
import os
import ssl
from pathlib import Path

from django.core.exceptions import ImproperlyConfigured

BASE_DIR = Path(__file__).resolve().parent.parent

secret_file = os.path.join(BASE_DIR, 'secrets.json')

# SECURITY WARNING: keep the secret key used in production secret!
with open(secret_file) as f:
    secrets = json.loads(f.read())


def get_secret(setting, secrets=secrets):
    """비밀 변수를 가져오거나 명시적 예외를 반환한다."""
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {} environment variable".format(setting)
        raise ImproperlyConfigured(error_msg)


SECRET_KEY = get_secret("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sites',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # 3rd
    'rest_framework',
    'rest_framework_jwt',
    'rest_framework.authtoken',
    'corsheaders',
    'drf_yasg',
    'django_filters',
    'rest_auth',
    'allauth',
    'allauth.account',
    'rest_auth.registration',
    # 'django_celery_beat',
    # 'django_celery_results',
    # Apps
    'pinterestAccounts',
    'pin',
    'tags',
    'boards',
]

AUTH_USER_MODEL = 'pinterestAccounts.Account'

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

WSGI_APPLICATION = 'backend.wsgi.application'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'pinterest',
        'USER': 'park',
        'PASSWORD': get_secret("LOCALPASSWORD"),
        'HOST': 'localhost',
        'PORT': '',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

REST_FRAMEWORK = {  # added
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.JSONParser',
    ],
    'DATETIME_FORMAT': "%m/%d/%Y %H:%M:%S",
    'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.AllowAny'],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ]
}
# django - allauth config
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'
OLD_PASSWORD_FIELD_ENABLED = True
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = '/rest-auth/registration/?verification=1'
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = '/rest-auth/registration/?verification=1'
SITE_ID = 1
REST_USE_JWT = True
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# user serializer custom
REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'pinterestAccounts.serializers.CurrentAccountSerializer'
}
JWT_AUTH = {
    'JWT_SECRET_KEY': SECRET_KEY,
    'JWT_RESPONSE_PAYLOAD_HANDLER': 'pinterestAccounts.utils.my_jwt_response_handler',  # jwt_response_handler 커스텀
    'JWT_ALGORITHM': 'HS256',
    'JWT_ALLOW_REFRESH': True,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=7),
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=28),
}
AUTHENTICATION_BACKENDS = [
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',
    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
]

# celery config
# redis 를 message broker 로 사용하고, 그것에 연결함
CELERY_ALWAYS_EAGER = True
CELERY_BROKER_URL = "redis://:u+QBCJrgZxlwIAJ0mGH6Z8NPs81r5f1EYJZfLrn7U5I=" \
                    "@pinterestredis123.redis.cache.windows.net"
# broker_use_ssl = True
CELERY_RESULT_BACKEND = "redis://:u+QBCJrgZxlwIAJ0mGH6Z8NPs81r5f1EYJZfLrn7U5I=" \
                        "@pinterestredis123.redis.cache.windows.net"
# CELERY_ACCEPT_CONTENT = ['application/json']
# CELERY_RESULT_SERIALIZER = 'json'
# CELERY_TASK_SERIALIZER = 'json'

SCHEDULE_MINUTE = 60
SCHEDULE_HOUR = 60 * SCHEDULE_MINUTE
SCHEDULE_DAY = 24 * SCHEDULE_HOUR
SCHEDULE_WEEK = 7 * SCHEDULE_DAY
SCHEDULE_MONTH = 30 * SCHEDULE_DAY

# redis cache (Cacheops)
INSTALLED_APPS += ['cacheops']

CACHEOPS_LRU = True

CACHEOPS = {
    'pin.Pin': {'ops': 'get', 'timeout': 60*60*24},  # Pin Model 을 GET 으로 조회하는 경우 db 보다 캐시를 먼저 본다.
}

CACHEOPS_REDIS = {
    'host': 'pinterestredis123.redis.cache.windows.net',  # redis-server is on same machine
    'port': 6380,        # default redis port
    'password': 'u+QBCJrgZxlwIAJ0mGH6Z8NPs81r5f1EYJZfLrn7U5I=',     # optional
    'ssl': True
}
CACHEOPS_DEFAULTS = {
    'timeout': 60 * 60 * 1, # 1시간
    'cache_on_save': True # save()할때 캐시 할지
}