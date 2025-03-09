from django.db import models
from django.contrib.auth.models import User
from uuid import uuid4
# Create your models here.

class ChatRoom(models.Model):
    public_id = models.UUIDField(default=uuid4, editable=False)
    name = models.CharField(max_length=150, unique= True)
    created_at = models.DateTimeField(auto_now_add = True)
    image = models.ImageField(upload_to='chatroom_images/', blank=True, null=True)
    participants = models.ManyToManyField(User, related_name = 'chat_rooms', blank = True)
    created_by = models.ForeignKey(User, on_delete= models.CASCADE, related_name= "roomCreated", null= True)
    desc = models.TextField(blank= True, null= True)
    
    def __str__(self):
        return self.name
    
class ChatroomMessage(models.Model):
    chat_room = models.ForeignKey(ChatRoom, on_delete= models.CASCADE,related_name = "roomMessages")
    user = models.ForeignKey(User,on_delete= models.CASCADE, related_name= "userMessages")
    content = models.TextField()
    time_stamp = models.DateTimeField(auto_now_add= True)
    
    def __str__(self):
        return f'{self.user}: {self.content}'

class DirectMessage(models.Model):
    sender = models.ForeignKey(User, on_delete= models.CASCADE, related_name= "sent_messages")
    receiver = models.ForeignKey(User, on_delete= models.CASCADE, related_name= "received_messages")
    content = models.TextField()
    time_stamp = models.DateTimeField(auto_now_add= True)
    
    def __str__(self):
        return f'{self.user}: {self.content}'
    
class UserProfile(models.Model):
    public_id = models.UUIDField(default=uuid4, unique=True, primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    readonly_fields = ('public_id',)

    def __str__(self):
        return self.user.username
    
    def friends(self):
        """
        Retrieve all friends related to the user.
        """
        return UserProfile.objects.filter(
            models.Q(user_1__user_2=self) | models.Q(user_2__user_1=self)
        )
    
    def sent_friend_requests(self):
        """
        Retrieve all friend requests sent by this user.
        """
        return self.sent.all()

    def received_friend_requests(self):
        """
        Retrieve all friend requests received by this user.
        """
        return self.received.all()
    
class Friend(models.Model):
    id = models.AutoField(primary_key=True)
    user1 = models.ForeignKey(UserProfile, related_name='user_1', on_delete=models.CASCADE, to_field="public_id")
    user2 = models.ForeignKey(UserProfile, related_name='user_2', on_delete=models.CASCADE, to_field="public_id")

    class Meta:
        unique_together = ('user1', 'user2')

class FriendRequest(models.Model):
    id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(UserProfile, related_name='sent', on_delete=models.CASCADE, to_field="public_id")
    receiver = models.ForeignKey(UserProfile, related_name='received', on_delete=models.CASCADE, to_field="public_id")


    class Meta:
        unique_together = ('sender', 'receiver')