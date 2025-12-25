from django.contrib import admin
from django.contrib import admin
from .models import User, Medecin, Patient, Rendezvous

# Register your models here.
admin.site.register(User)
admin.site.register(Medecin)
admin.site.register(Patient)
admin.site.register(Rendezvous)