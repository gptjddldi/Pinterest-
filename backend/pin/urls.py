from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('pins', views.PinViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('following/', views.FollowingPinList.as_view()),
    path('board/', views.BoardPinList.as_view())
]