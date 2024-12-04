from django.contrib import admin
from .models import ChatRoom, ChatroomMessage, DirectMessage, UserProfile

# Register your models here.

admin.site.register(ChatRoom)
admin.site.register(ChatroomMessage)
admin.site.register(DirectMessage)
admin.site.register(UserProfile)