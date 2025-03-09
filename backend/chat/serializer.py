from rest_framework import serializers
from .models import *

class ChatRoomSerializer(serializers.ModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, required=False)

    class Meta:
        model = ChatRoom
        fields = ['id', 'name', 'created_at', 'image', 'desc', 'participants', 'created_by']

    def create(self, validated_data):
        participants = validated_data.pop('participants', [])
        # Set the creator of the chat room to the currently authenticated user
        chat_room = ChatRoom.objects.create(
            created_by=self.context['request'].user,  
            **validated_data
        )
        chat_room.participants.add(self.context['request'].user) 
        
        if participants:
            chat_room.participants.add(*participants)  # Participants are optional, for simplification, we can directly choose participants
                                                        # when creating rooms, 
        return chat_room
    
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