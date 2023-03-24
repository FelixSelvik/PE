from django.contrib.auth import login as auth_login
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .forms import SignUpForm
from .models import Room

def home(request):
  return render(request, 'home/index.html')

def login(request):
  return render(request, 'home/login.html')

def signup(request):
  if request.method == 'POST':
    form = SignUpForm(request.POST)

    if form.is_valid():
      user = form.save()

      auth_login(request, user)

      return redirect('home')
  else:
    form = SignUpForm()

  return render(request, 'registration/signup.html', {'form':form})
  






