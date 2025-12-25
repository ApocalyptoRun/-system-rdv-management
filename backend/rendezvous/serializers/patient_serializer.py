from rest_framework import serializers
from rendezvous.models import Patient, User
from .user_serializer import UserSerializer  # Importe ta classe existante


class PatientSerializer(serializers.ModelSerializer):
    # On utilise ton serializer pour le rendu (GET)
    user = UserSerializer(read_only=True)

    # On ajoute les champs nécessaires pour la création (POST)
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = Patient
        fields = ['id', 'user', 'username', 'password', 'email']

    def create(self, validated_data):
        # On extrait les données pour l'utilisateur
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        email = validated_data.pop('email')

        # Création de l'User via le manager (pour le hash du password)
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            role='PATIENT'
        )

        # Création du patient lié
        patient = Patient.objects.create(user=user)
        return patient


