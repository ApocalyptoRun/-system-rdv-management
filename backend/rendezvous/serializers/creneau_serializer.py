from rest_framework import serializers
from rendezvous.models import Creneau, Medecin

class CreneauSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creneau
        fields = '__all__'