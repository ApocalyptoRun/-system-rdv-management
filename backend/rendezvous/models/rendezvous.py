from django.db import models
from .patient import Patient
from .medecin import Medecin

class Rendezvous(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    medecin = models.ForeignKey(Medecin, on_delete=models.CASCADE)
    date_rdv = models.DateTimeField()
    urgent = models.BooleanField(default=False)
    cree_le = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.date_rdv} - {self.patient}"
