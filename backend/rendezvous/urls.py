from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.rendezvous_view import RendezvousViewSet
from .views.patient_view import PatientViewSet
from .views.user_view import UserViewSet
from .views.medecin_view import MedecinViewSet
from .views.creneau_view import CreneauViewSet

router = DefaultRouter()
router.register('rendezvous', RendezvousViewSet, basename='rendezvous')
router.register('patients', PatientViewSet, basename='patients')
router.register('users', UserViewSet, basename='users')
router.register('medecins', MedecinViewSet, basename='medecins')
router.register('creneaux', CreneauViewSet, basename='creneaux')

urlpatterns = router.urls
