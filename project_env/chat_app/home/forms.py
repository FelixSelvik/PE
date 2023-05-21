from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from django.core.validators import EmailValidator

class SignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100, required=True)
    email = forms.CharField(validators=[EmailValidator()])
    phone = forms.CharField(max_length=8, min_length=8, required=False)
    subject = forms.CharField(max_length=100, required=True)
    message = forms.CharField(widget=forms.Textarea, required=True)