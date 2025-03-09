from django import forms 
from django.contrib.auth.forms import UserCreationForm
from .models import *

class RegisterForm(UserCreationForm):
    first_name = forms.CharField(max_length=64)
    last_name = forms.CharField(max_length=64)
    email = forms.EmailField()
    profile_pic = forms.ImageField(required= False)
    class Meta:
        model = User
        fields = ["first_name","last_name","profile_pic","username","email","password1","password2"]
