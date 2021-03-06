from django.urls import include, path
from rest_framework.routers import DefaultRouter

from boards import views

router = DefaultRouter()
router.register("", views.BoardViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>/add_pin', views.add_pin),
]