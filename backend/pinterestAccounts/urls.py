from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token

from pinterestAccounts import views

urlpatterns = [

    path('user/<slug:username>/', views.get_user_info_by_username),
    # path('password_change/', views.PasswordChangeView.as_view()),
    # path('suggestions/', views.SuggestionList.as_view()),
    path('follow/', views.follow_user),
    path('unfollow/', views.unfollow_user),
    path('following-list/', views.FollowingList.as_view()),

]