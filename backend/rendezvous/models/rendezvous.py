from django.db import models
from .patient import Patient
from .creneau import Creneau

class Rendezvous(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='rendezvous')
    creneau = models.OneToOneField(Creneau, on_delete=models.CASCADE, related_name='rdv_details', null=True, blank=True)

    urgent = models.BooleanField(default=False)
    motif = models.TextField(null=True, blank=True)
    cree_le = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"RDV le {self.creneau.date} avec Dr {self.creneau.medecin.user.username} - Patient: {self.patient.user.username}"