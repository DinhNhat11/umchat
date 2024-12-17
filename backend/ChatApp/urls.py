from django.contrib import admin
from django.urls import path, include, re_path
from chat.views import *
# from django.contrib.auth.views import LoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("chat.urls")),
    path("chatrooms/", ChatRoomView.as_view(), name="chat-rooms"),
    path("users/<uuid:id>", UserView.as_view(), name="users"),
    path("add-friend/", FriendRequestView.as_view(), name="friend-request"),
    path("accounts/login/", MyLoginView.as_view(), name="login-user"),
    path("accounts/get-csrf-token/", GetCSRFToken.as_view(), name="get-csrf-token"),
]
