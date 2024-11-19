from django.db import models
from django.contrib.auth.models import User 
# Create your models here.


class ChatRoom(models.Model):
    name = models.CharField(max_length=150, unique= True)
    created_at = models.DateTimeField(auto_now_add = True)
    image = models.ImageField(upload_to='chatroom_images/', blank=True, null=True)
    participants = models.ManyToManyField(User, related_name = 'chat_rooms', blank = True)
    
    def __str__(self):
        return self.name
    
class Message(models.Model):
    chat_room = models.ForeignKey(ChatRoom, on_delete= models.CASCADE,related_name = "roomMessages")
    user = models.ForeignKey(User,on_delete= models.CASCADE, related_name= "userMessages")
    content = models.TextField()
    time_stamp = models.DateTimeField(auto_now_add= True)
    
    def __str__(self):
        return f'{self.user}: {self.content}'
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def __str__(self):
        return self.user.username