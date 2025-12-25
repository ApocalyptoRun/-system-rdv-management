from rest_framework.viewsets import ModelViewSet
from rendezvous.models import Patient
from rendezvous.serializers.patient_serializer import PatientSerializer

class PatientViewSet(ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
