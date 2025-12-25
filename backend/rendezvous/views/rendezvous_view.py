from rest_framework.viewsets import ModelViewSet
from rendezvous.models import Rendezvous
from rendezvous.serializers.rendezvous_serializer import RendezvousSerializer

class RendezvousViewSet(ModelViewSet):
    queryset = Rendezvous.objects.all()
    serializer_class = RendezvousSerializer
