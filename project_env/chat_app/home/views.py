from django.shortcuts import render

from django.shortcuts import render

def home(request):
  return render(request, 'home/index.html')

def login(request):
  return render(request, 'user/login.html')