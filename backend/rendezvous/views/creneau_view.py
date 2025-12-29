from datetime import datetime, timedelta

from requests import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action

from rendezvous.models import Creneau, Medecin
from rendezvous.serializers.creneau_serializer import CreneauSerializer


# views.py
class CreneauViewSet(viewsets.ModelViewSet):
    serializer_class = CreneauSerializer

    def get_queryset(self):
        queryset = Creneau.objects.all()
        medecin_id = self.request.query_params.get('medecin_id')
        date_param = self.request.query_params.get('date')
        dispo = self.request.query_params.get('dispo')

        if medecin_id:
            queryset = queryset.filter(medecin_id=medecin_id)
        if date_param:
            queryset = queryset.filter(date=date_param)
        if dispo == 'true':
            queryset = queryset.filter(est_disponible=True)

        return queryset.order_by('heure_debut')

    @action(detail=False, methods=['post'])
    def generer(self, request):
        medecin_id = request.data.get('medecin_id')
        date_str = request.data.get('date')

        if not medecin_id or not date_str:
            return Response({"error": "medecin_id et date sont requis"}, status=400)

        try:
            medecin = Medecin.objects.get(id=medecin_id)
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()

            # Paramètres de la journée
            heure_actuelle = datetime.combine(date_obj, datetime.strptime("08:00", "%H:%M").time())
            heure_fin = datetime.combine(date_obj, datetime.strptime("12:00", "%H:%M").time())

            creneaux_crees = []
            while heure_actuelle < heure_fin:
                h_debut = heure_actuelle.time()
                h_fin = (heure_actuelle + timedelta(minutes=30)).time()

                # On utilise get_or_create pour ne pas créer de doublons
                obj, created = Creneau.objects.get_or_create(
                    medecin=medecin,
                    date=date_obj,
                    heure_debut=h_debut,
                    heure_fin=h_fin,
                    defaults={'est_disponible': True}
                )
                creneaux_crees.append(obj)
                heure_actuelle += timedelta(minutes=30)

            serializer = CreneauSerializer(creneaux_crees, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=400)