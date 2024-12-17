from rest_framework import serializers
from .models import *

class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ['name', 'created_at', 'image', 'participants']

class ChatroomMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatroomMessage
        fields = ['chat_room', 'user', 'content', 'time_stamp']

class DirectMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DirectMessage
        fields = ['sender', 'receiver', 'content', 'time_stamp']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'profile_picture']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['sender', 'receiver']