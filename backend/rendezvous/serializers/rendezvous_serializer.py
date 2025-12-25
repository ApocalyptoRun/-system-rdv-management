from rest_framework import serializers
from rendezvous.models import Rendezvous
from django.utils import timezone

class RendezvousSerializer(serializers.ModelSerializer):
    patient_nom = serializers.CharField(source='patient.user.username', read_only=True)
    medecin_nom = serializers.CharField(source='medecin.user.username', read_only=True)

    class Meta:
        model = Rendezvous
        fields = ['id', 'patient', 'patient_nom', 'medecin', 'medecin_nom', 'date_rdv', 'urgent', 'cree_le']

    def validate(self, data):
        """
        Logique métier : Vérifier si le médecin est libre
        """
        medecin = data.get('medecin')
        date_rdv = data.get('date_rdv')

        # 1. Vérifier que la date n'est pas dans le passé
        if date_rdv < timezone.now():
            raise serializers.ValidationError("Vous ne pouvez pas prendre rendez-vous dans le passé.")

        # 2. Vérifier si le médecin a déjà un RDV à cette date/heure précise
        # Équivalent de : SELECT * FROM rendezvous WHERE medecin_id = X AND date_rdv = Y
        exists = Rendezvous.objects.filter(
            medecin=medecin,
            date_rdv=date_rdv
        ).exists()

        if exists:
            raise serializers.ValidationError(
                {"date_rdv": "Ce médecin a déjà un rendez-vous à cette heure précise."}
            )

        return data