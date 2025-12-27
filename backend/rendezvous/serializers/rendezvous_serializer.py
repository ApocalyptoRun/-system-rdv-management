from rest_framework import serializers
from rendezvous.models import Rendezvous, Creneau


class RendezvousSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rendezvous
        fields = '__all__'

    def validate_creneau(self, value):
        if not value.est_disponible:
            raise serializers.ValidationError("Désolé, ce créneau est déjà réservé.")
        return value

    def create(self, validated_data):
        # 1. Créer le RDV
        rdv = super().create(validated_data)
        # 2. Marquer le créneau comme indisponible immédiatement
        creneau = rdv.creneau
        creneau.est_disponible = False
        creneau.save()
        return rdv