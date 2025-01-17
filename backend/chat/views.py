from .models import *
from .forms import *
from .serializer import *

from django.shortcuts import render, redirect, get_object_or_404
from django.http import Http404
from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from uuid import UUID

import json

@method_decorator(login_required, name='dispatch')
class ChatRoomView(APIView):
    template_name = "chatrooms"
    def get(self,request, room_id = None,format=None):
        if room_id:
            chat_room = ChatRoom.objects.get(id = int(room_id))
            messages_queryset = chat_room.roomMessages.order_by('time_stamp')
            messages = ChatroomMessageSerializer(messages_queryset, many = True).data # get all messages in a room
            
            result = {
                "name": chat_room.name,
                "created_at": chat_room.created_at,
                "image": "blank",
                "chatroom_messages": messages,
                "participants": [{"Username": user.username} for user in chat_room.participants.all()]
            }
            return Response(result)
        
        else:
            chat_rooms = [{
                "name": chat_room.name,
                "created_at": chat_room.created_at,
                "image": "blank",
                "participants": [{"Username": user.username} for user in chat_room.participants.all()]
            } for chat_room in request.user.chat_rooms.all()]

            return Response(chat_rooms)
    
    def post(self, request):
        serializer = ChatRoomSerializer(data=request.data)
        if serializers.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

# @method_decorator(login_required, name='dispatch')
# class ChatRoomView(APIView):
#     template_name = "chatrooms"
#     def get(self, request):       
#         chat_rooms = []         # a list contain all chatroom that the user join
#         for chat_room in request.user.chat_rooms.all():
#             messages_queryset = chat_room.roomMessages.order_by('time_stamp')
#             messages = ChatroomMessageSerializer(messages_queryset, many = True).data # get all messages in a room
            
#             chat_rooms.append({
#                 "name": chat_room.name,
#                 "created_at": chat_room.created_at,
#                 "image": "blank",
#                 "chatroom_messages": messages,
#                 "participants": [{"Username": user.username} for user in chat_room.participants.all()]
#             })

#         return Response(chat_rooms)
    
#     def post(self, request):
#         serializer = ChatRoomSerializer(data=request.data)
#         if serializers.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)
        
class CreateChatRoomView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ChatRoomSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
        
@method_decorator(login_required, name='dispatch')
class UserView(APIView):
    template_name = "user"
    def get(self, request, id):
        try:
            data = UserProfile.objects.get(public_id=id)
            message = {"username": data.user.username}
            status = 200

        except ObjectDoesNotExist:
            message = "The username with id: " + id + "does not exist"
            status = 404

        return Response(message, status)
    
@method_decorator(login_required, name='dispatch')
class FriendRequestView(APIView):
    template_name = "friend_request"

    def post(self, request):
        sender = request.user.profile.public_id
        receiver = UUID(request.data['receiver'])
        print(sender, receiver)
        serializer = FriendRequestSerializer(data={'sender': sender, 'receiver': receiver})
                
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
            return (Response(status=200))
        
        return Response(status=301)
        


@method_decorator(csrf_protect, name='dispatch')
class MyLoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        if request.method == "POST":
            if request.content_type == 'application/json':
                try:
                    data = json.loads(request.body)
                    username = data.get('username')
                    password = data.get('password')
                except json.JSONDecodeError:
                    return Response({'error': 'Invalid JSON'}, status=400)
        
        if not User.objects.filter(username=username).exists():
            message = "The username you entered does not exist. Please try again."
            return Response(message, status=401)
        
        # Authenticate the user with the provided username and password
        user = authenticate(username=username, password=password)
        
        if user is None:
            message = "The Username / password you entered is incorrect. Please try again."
            return Response(message, status=401)
        else:
            response = {
                "username": user.username,
                "email": user.email
            }
            login(request, user)
            return Response(response, status=200)
        
    def get(self, request):
        if request.method == "GET":
            if request.user.is_authenticated:
                response = {
                    "username": request.user.username,
                    "email": request.user.email
                }
                return Response(response, status=200)
        
        return Response("User not Logged In", 401)

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request):
        return Response({"success": "CSRF cookie set"})
    
@method_decorator(login_required, name='dispatch')
class TextAreaView(APIView):
    def get(self, request, room_id):
        chat_rooms = [{
            "name": chat_room.name,
            "created_at": chat_room.created_at,
            "image": "blank",
            "participants": [{"Username": user.username} for user in chat_room.participants.all()]
        } for chat_room in request.user.chat_rooms.all()]

        return Response(chat_rooms)
    
    def post(self, request):
        serializer = ChatRoomSerializer(data=request.data)
        if serializers.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        

@login_required        
def create_chat_room(request):
    new_participants = User.objects.exclude(id = request.user.id)
    if request.method == 'POST':
        name = request.POST.get('name')
        image = request.FILES.get('image')
        chosen_participants_ids = request.POST.getlist('new_participants')
        chat_room = ChatRoom.objects.create(name=name, image=image)
        chat_room.participants.add(request.user)  # Add the creator
        chat_room.participants.add(*chosen_participants_ids)
        return redirect('chat-page', room_id=chat_room.id)
    return render(request, 'chat/create_chat_room.html',{
        "new_participants": new_participants
    })

def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
        else:
            return render(request,"chat/register.html",{
                "form":form
            })
        return redirect("login-user")
    else:
        return render(request,"chat/register.html",{
            "form":RegisterForm()
        })
        
        
@login_required
def chatPage(request, room_id,  *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect("login-user")
    
    rooms = request.user.chat_rooms.all()

    if room_id is not None:
        room = get_object_or_404(ChatRoom, id=room_id)
        messages = ChatroomMessage.objects.filter(chat_room = room).order_by('time_stamp')
        new_participants = User.objects.exclude(chat_rooms = room)
        context = {
            'rooms': rooms,
            'room': room,
            'messages': messages,
            'new_participants': new_participants
            }
        return render(request, 'chat/chatPage.html', context)
    else:
        context = {
            'rooms': rooms,
            'room': None,
            'messages': None 
        }
        return render(request, 'chat/chatPage.html', context)
        
@login_required
def custom_logout(request):
    logout(request)
    return redirect('login-user')

    
@login_required
def chatRoomList(request):
    if not request.user.is_authenticated:
        return redirect("login-user")
    
    rooms = request.user.chat_rooms.all()

    context = {
        'rooms': rooms,
        'room': None,
        'messages': None 
    }
    return render(request, 'chat/chatPage.html', context)

@login_required
def add(request, room_id):
    if request.method == "POST":
        room = get_object_or_404(ChatRoom, pk=room_id)
        new_participant = User.objects.get(pk = int(request.POST["new_participant"]))
        room.participants.add(new_participant)
        return redirect("chat-page",room_id)

@login_required    
def leave(request, room_id):
    if request.method == "POST":
        room = ChatRoom.objects.get(pk=room_id)
        if request.user in room.participants.all():
            room.participants.remove(request.user)
        return redirect("chat-room-list")