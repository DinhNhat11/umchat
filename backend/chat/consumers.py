from django.contrib.auth.models import User
from .models import ChatRoom, Message
from asgiref.sync import sync_to_async
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    
    # async def connect(self):
    #     # Get the room_id from the URL
    #     self.room_id = self.scope['url_route']['kwargs']['room_id']
    #     self.room_group_name = f"chat_{self.room_id}"

    #     # Join the room group
    #     await self.channel_layer.group_add(
    #         self.room_group_name,
    #         self.channel_name
    #     )

    #     await self.accept()
    
    async def connect(self):
        # Get the room_id from the URL
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        print(f"Connecting to room with ID: {self.room_name}")  # Debugging log

        chat_room = await self.get_chat_room(self.room_name)
        if not chat_room:
            print(f"Chat room '{self.room_name}' does not exist.")  # Debug log
            await self.close()  # Optionally close the connection if room doesn't exist
            return

        self.room_group_name = f"chat_{self.room_name}"

        # Join the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        
    @sync_to_async
    def get_user(self, username):
        return User.objects.get(username=username)

    
    @sync_to_async
    def create_message(self, chat_room, user, message):
        return Message.objects.create(chat_room=chat_room, user=user, content=message)

    async def disconnect(self,close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
    
    @sync_to_async
    def get_chat_room(self, room_name):
        chat_room = ChatRoom.objects.filter(name=room_name).first()  # Use .first() to avoid exceptions
        return chat_room
    
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        username = text_data_json["username"]
        
        # Get user and chat room asynchronously
        user = await self.get_user(username)
        chat_room = await self.get_chat_room(self.room_name)

        # If no chat room is found, handle the error
        if not chat_room:
            print(f"Chat room with ID {self.room_name} does not exist.")
            await self.send(text_data=json.dumps({
                "error": f"Chat room with ID {self.room_name} does not exist."
            }))
            await self.close()  # Optionally close the connection if room doesn't exist
            return

        # Create the message asynchronously
        message_obj = await self.create_message(chat_room, user, message)

        # Send message to the group
        await self.channel_layer.group_send(
            self.room_group_name, {
                "type": "sendMessage",
                "message": message,
                "username": username,
                "time_stamp": message_obj.time_stamp.strftime('%H:%M')
            }
        )

        
    async def sendMessage(self, event):
        message = event["message"]
        username = event["username"]
        time_stamp = event["time_stamp"]
        
        await self.send(text_data=json.dumps({
            "message": message,
            "username": username,
            "time_stamp": time_stamp
        }))
