from django.contrib import admin
from django.urls import path, include, re_path
from chat.views import *
from django.contrib.auth.views import LoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("chat.urls")),
    path("chatrooms/", ChatRoomView.as_view(), name="chat-rooms"),
    path("accounts/login/", LoginView.as_view(), name="login-user"),
    path("accounts/get-csrf-token/", GetCSRFToken.as_view(), name="get-csrf-token"),
]
