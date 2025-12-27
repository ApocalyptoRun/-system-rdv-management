from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# serializers.py (Django)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Ajout des informations de base
        token['username'] = user.username
        token['role'] = user.role
        token['user_id'] = user.id  # Ton ID 31

        # Ajout de l'ID spécifique au profil (Héritage)
        if user.role == 'PATIENT':
            # On vérifie si l'objet patient existe pour cet user
            patient_id = getattr(user, 'patient', None)
            token['patient_id'] = patient_id.id if patient_id else None

        elif user.role == 'MEDECIN':
            medecin_id = getattr(user, 'medecin', None)
            token['medecin_id'] = medecin_id.id if medecin_id else None

        return token