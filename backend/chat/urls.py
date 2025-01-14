from django.urls import path, include
from chat import views 



urlpatterns = [
    path("", views.chatRoomList, name="chat-room-list"),
    path("register/",views.register, name = "register"),
    # login-section
    path("accounts/logout/", views.custom_logout, name="logout-user"),
    path("auth",include("django.contrib.auth.urls")),
    path("create-room/", views.create_chat_room, name="create-room"),
    path("chatrooms/<int:room_id>/add", views.add, name = "add"),
    path("chatrooms/<int:room_id>/leave", views.leave, name = "leave"),
    path("chatrooms/<int:room_id>/", views.chatPage, name="chat-page"),
]
