from django.db import models
from rendezvous.models import Medecin


class Creneau(models.Model):
    medecin = models.ForeignKey(Medecin, on_delete=models.CASCADE, related_name='creneaux')
    date = models.DateField()
    heure_debut = models.TimeField()
    heure_fin = models.TimeField()
    est_disponible = models.BooleanField(default=True)

    class Meta:
        # Un médecin ne peut pas avoir deux créneaux à la même heure
        unique_together = ('medecin', 'date', 'heure_debut')