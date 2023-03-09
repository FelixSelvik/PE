from django.shortcuts import render

from django.shortcuts import render

def login(request):
  return render(request, 'user/login.html')