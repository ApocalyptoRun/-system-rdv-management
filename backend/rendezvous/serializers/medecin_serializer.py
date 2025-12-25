from rest_framework import serializers
from rendezvous.models import Medecin, User
from rendezvous.serializers import UserSerializer

class MedecinSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)

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