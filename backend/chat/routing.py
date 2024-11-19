from django.urls import path , include
from chat.consumers import ChatConsumer
from . import consumers

# Here, "" is routing to the URL ChatConsumer which 
# will handle the chat functionality.
websocket_urlpatterns = [
    path('ws/chat/<str:room_name>/', consumers.ChatConsumer.as_asgi()),  # Capture room_id here
]