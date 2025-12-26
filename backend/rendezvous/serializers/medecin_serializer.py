from rest_framework import serializers
from rendezvous.models import Medecin, User
from rendezvous.serializers import UserSerializer

class MedecinSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, required=False)
    email = serializers.EmailField(write_only=True, required=False)

    class Meta:
        model = Medecin
        fields = ['id', 'user', 'specialite', 'username', 'password', 'email']

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        email = validated_data.pop('email')
        specialite = validated_data.pop('specialite')

        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            role='MEDECIN'
        )

        medecin = Medecin.objects.create(user=user, specialite=specialite)
        return medecin

    def update(self, instance, validated_data):
        # 1. Récupérer les données du validateur (si présentes)
        username = validated_data.pop('username', None)
        specialite = validated_data.get('specialite', instance.specialite)

        # 2. Mise à jour du User lié (Nom uniquement)
        if username:
            instance.user.username = username
            instance.user.save()

        # 3. Mise à jour du Medecin (Spécialité)
        instance.specialite = specialite
        instance.save()

        return instance