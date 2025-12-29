from rest_framework.viewsets import ModelViewSet
from rendezvous.models import Rendezvous
from rendezvous.serializers.rendezvous_serializer import RendezvousSerializer


class RendezvousViewSet(ModelViewSet):
    serializer_class = RendezvousSerializer

    def get_queryset(self):
        queryset = Rendezvous.objects.all()

        patient_id = self.request.query_params.get('patient')

        if patient_id is not None:
            queryset = queryset.filter(patient_id=patient_id)

        return queryset