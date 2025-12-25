from django.db import models
from .user import User

class Medecin(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'MEDECIN'}
    )

    specialite = models.CharField(max_length=100)

    def __str__(self):
        return f"Dr {self.user.username}"
