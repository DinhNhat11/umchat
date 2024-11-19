from django.shortcuts import render, redirect, get_object_or_404
from django.http import Http404
from .models import *
from .forms import *
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required


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
def custom_logout(request):
    logout(request)
    return redirect('login-user')

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

@login_required
def chatPage(request, room_id,  *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect("login-user")
    
    rooms = request.user.chat_rooms.all()

    if room_id is not None:
        room = get_object_or_404(ChatRoom, id=room_id)
        messages = Message.objects.filter(chat_room = room).order_by('time_stamp')
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