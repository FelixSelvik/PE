from django.contrib.auth import views as auth_views
from django.urls import path
from . import views


urlpatterns = [
  path('', views.home, name="home"),
  path('', views.login, name="login"),
  path('signup/', views.signup, name="signup"),
  path('logout/', auth_views.LogoutView.as_view(), name="logout"),
  path("<str:room_name>/", views.room, name="room"),
]