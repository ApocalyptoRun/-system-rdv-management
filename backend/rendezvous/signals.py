# rendezvous/signals.py
from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models.patient import Patient
from .models.medecin import Medecin

@receiver(post_delete, sender=Patient)
def delete_user_with_patient(sender, instance, **kwargs):
    if instance.user:
        instance.user.delete()

@receiver(post_delete, sender=Medecin)
def delete_user_with_medecin(sender, instance, **kwargs):
    if instance.user:
        instance.user.delete()