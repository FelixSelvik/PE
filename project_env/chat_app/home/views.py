from django.shortcuts import render

def home(request):
  return render(request, 'home/index.html')

def login(request):
  return render(request, 'home/login.html')

def signup(request):
  return render(request, 'home/signup.html')



