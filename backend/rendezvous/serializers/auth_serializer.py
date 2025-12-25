from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Ajouter des données personnalisées dans le payload du JWT
        token['username'] = user.username
        token['role'] = user.role
        return token