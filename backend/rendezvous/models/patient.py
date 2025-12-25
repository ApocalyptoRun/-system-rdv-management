from django.db import models
from .user import User

class Patient(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'PATIENT'}
    )

    def __str__(self):
        return self.user.username
