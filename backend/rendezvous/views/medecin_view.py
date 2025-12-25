from rest_framework.viewsets import ModelViewSet
from rendezvous.models import Medecin
from rendezvous.serializers.medecin_serializer import MedecinSerializer

class MedecinViewSet(ModelViewSet):
    queryset = Medecin.objects.all()
    serializer_class = MedecinSerializer
