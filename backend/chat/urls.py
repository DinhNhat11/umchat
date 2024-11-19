from django.urls import path, include
from chat import views 
from django.contrib.auth.views import LoginView, LogoutView


urlpatterns = [
    path("", views.chatRoomList, name="chat-room-list"),
    path("register/",views.register, name = "register"),
    # login-section
    path("accounts/login/", LoginView.as_view
         (template_name="chat/LoginPage.html", next_page="chat-room-list"), name="login-user"),
    path("accounts/logout/", views.custom_logout, name="logout-user"),
    path("auth",include("django.contrib.auth.urls")),
    path("create-room/", views.create_chat_room, name="create-room"),
    path("<int:room_id>/add", views.add, name = "add"),
    path("<int:room_id>/leave", views.leave, name = "leave"),
    path("<int:room_id>/", views.chatPage, name="chat-page"),
]
