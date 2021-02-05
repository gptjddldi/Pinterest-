from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token

from account import views

router = DefaultRouter()
router.register('boards', views.BoardViewSet)

urlpatterns = [
    path('signup/', views.AccountSignupView.as_view()),
    path('profile/', views.AccountCurrentView.as_view()),
    path('user/<slug:username>/', views.get_user_info_by_username),
    path('password_change/', views.PasswordChangeView.as_view()),
    path('login/', obtain_jwt_token),
    path('suggestions/', views.SuggestionList.as_view()),
    # path('board/', views.BoardCreateListView.as_view()),
    # path('board/add_pin/')
    path('board/<int:pk>/add_pin', views.add_pin),
    path('verify/', verify_jwt_token),
    path('', include(router.urls)),
    # path(r'(?P<pk>[0-9]+)/$',views.add_pin)
    path('follow/', views.follow_user),
    path('unfollow/', views.unfollow_user),
]