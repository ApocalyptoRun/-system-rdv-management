from rest_framework import serializers
from rendezvous.models import Creneau

class CreneauSerializer(serializers.ModelSerializer):
    # On ajoute un champ qui récupère le username à travers la relation 'medecin'
    # 'source' permet d'aller chercher le champ dans le modèle lié
    medecin_nom = serializers.ReadOnlyField(source='medecin.user.username')

    class Meta:
        model = Creneau
        # On liste explicitement les champs pour inclure notre nouveau champ medecin_nom
        fields = ['id', 'date', 'heure_debut', 'heure_fin', 'est_disponible', 'medecin', 'medecin_nom']