from rest_framework.viewsets import ModelViewSet
from rendezvous.models import User
from rendezvous.serializers.user_serializer import UserSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
