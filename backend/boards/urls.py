from django.urls import include, path
from rest_framework.routers import DefaultRouter

from boards import views

router = DefaultRouter(trailing_slash=False)
router.register("", views.BoardViewSet)

urlpatterns = [
    path('', include(router.urls)),
]