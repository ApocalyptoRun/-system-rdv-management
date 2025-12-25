from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)

    username = models.CharField(max_length=150, unique=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    ROLE_CHOICES = (
        ('PATIENT', 'Patient'),
        ('MEDECIN', 'Médecin'),
        ('ADMIN', 'Administrateur'),
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
