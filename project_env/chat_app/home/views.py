from django.contrib.auth import login as auth_login
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .forms import SignUpForm
from django.http import HttpResponseRedirect
from .forms import ContactForm
import os
from datetime import datetime


def home(request):
  return render(request, 'home/index.html')

def login(request):
  return render(request, 'home/login.html')

def choices(request):
  return render(request, 'choices/choice.html')

def signup(request):
  if request.method == 'POST':
    form = SignUpForm(request.POST)

    if form.is_valid():
      user = form.save()

      auth_login(request, user)

      return redirect('http://127.0.0.1:8000/home/room/')
  else:
    form = SignUpForm()

  return render(request, 'registration/signup.html', {'form':form})

def room(request, room_name):
  return render(request, "rooms/room.html", {"room_name": room_name})

def contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST, prefix='contact')
        
        if form.is_valid():
            save_form_data(form.cleaned_data)
            return HttpResponseRedirect("/home/")

    else:
        form = ContactForm(prefix='contact')

    return render(request, "contact/contact.html", {"form": form})

def save_form_data(data):
    desktop_path = os.path.join(os.path.expanduser("~"), "Desktop")
    file_path = os.path.join(desktop_path, "form_data.txt")

    with open(file_path, "a") as file:
        file.write("----------------------------------\n")
        file.write("Name: " + data["name"] + "\n")
        file.write("Email: " + data["email"] + "\n")
        file.write("Phone: " + data["phone"] + "\n")
        file.write("Subject: " + data["subject"] + "\n")
        file.write("Message: " + data["message"] + "\n")
        current_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        file.write("Date: " + current_date + "\n")
        file.write("----------------------------------\n")
  

  






