from allauth.account.views import confirm_email
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_auth.registration.views import VerifyEmailView
from rest_framework import permissions

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('pin.urls')),
    path('pinterestAccounts/', include('pinterestAccounts.urls')),
    path('tags/', include('tags.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    url('account-confirm-email/(?P<key>.+)/$', confirm_email,
        name='account_confirm_email'),
    re_path(r'^account-confirm-email/', VerifyEmailView.as_view(),
            name='account_email_verification_sent'),

]

# https://egg-money.tistory.com/222?category=811218
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns += [
   url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]