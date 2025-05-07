# reservation/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SeatViewSet, ReservationViewSet

router = DefaultRouter()
router.register(r'seats', SeatViewSet)
router.register(r'reservations', ReservationViewSet, basename='reservation')

app_name = 'reservation'

urlpatterns = [
    path('', include(router.urls)),
]