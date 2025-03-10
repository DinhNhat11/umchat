import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ChatApp.settings')

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter , URLRouter
from chat import routing
from django.urls import path
from chat.consumers import ChatConsumer

application = ProtocolTypeRouter(
    {
        "http" : get_asgi_application() , 
        "websocket" : AuthMiddlewareStack(
            URLRouter(
                [
                path('ws/chat/<str:room_name>/', ChatConsumer.as_asgi()),
                ]
            )    
        )
    }
)
