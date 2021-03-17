from django.urls import path

from pinterestAccounts import views

urlpatterns = [
    path('user/<slug:username>', views.GetUserInfoByUsername.as_view()),
    path('follow/', views.follow_user),
    path('unfollow/', views.unfollow_user),
    path('following-list/', views.FollowingList.as_view()),
]