from django.urls import path, include
from rest_framework.routers import DefaultRouter

from tags import views

router = DefaultRouter(trailing_slash=False)
router.register("", views.TagViewSet)

urlpatterns = [
    path('', include(router.urls))
]