from rest_framework import serializers
from rendezvous.models import Rendezvous, Creneau
from rendezvous.serializers.creneau_serializer import CreneauSerializer


class RendezvousSerializer(serializers.ModelSerializer):
    # On ajoute ceci pour avoir les détails du créneau (date, heure) dans les GET
    # Mais on garde 'creneau' en ID pour les POST (écriture)
    creneau_details = CreneauSerializer(source='creneau', read_only=True)

    class Meta:
        model = Rendezvous
        fields = ['id', 'patient', 'creneau', 'creneau_details', 'urgent', 'motif', 'cree_le']

    def validate_creneau(self, value):
        if not value.est_disponible:
            raise serializers.ValidationError("Désolé, ce créneau est déjà réservé.")
        return value

    def create(self, validated_data):
        rdv = super().create(validated_data)
        # Logique de mise à jour de disponibilité
        creneau = rdv.creneau
        creneau.est_disponible = False
        creneau.save()
        return rdv