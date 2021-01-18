from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from account import views

urlpatterns = [
    path('signup/', views.AccountSignupView.as_view()),
    path('profile/', views.AccountCurrentView.as_view()),
    path('login/', obtain_jwt_token),
    path('suggestions/', views.SuggestionList.as_view()),
    path('board/', views.BoardCreateListView.as_view()),
]