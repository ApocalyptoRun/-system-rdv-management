from rest_framework import viewsets
from rendezvous.models import Creneau
from rendezvous.serializers.creneau_serializer import CreneauSerializer


class CreneauViewSet(viewsets.ModelViewSet):
    queryset = Creneau.objects.all()
    serializer_class = CreneauSerializer

    def get_queryset(self):
        # Permet de filtrer sur Postman : /api/creneaux/?medecin_id=1&dispo=true
        queryset = Creneau.objects.all()
        medecin_id = self.request.query_params.get('medecin_id')
        dispo = self.request.query_params.get('dispo')

        if medecin_id:
            queryset = queryset.filter(medecin_id=medecin_id)
        if dispo == 'true':
            queryset = queryset.filter(est_disponible=True)
        return queryset