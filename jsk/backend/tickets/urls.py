from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import StadiumViewSet, MatchViewSet, TicketViewSet

router = DefaultRouter()
router.register(r'stadiums', StadiumViewSet, basename='stadium')
router.register(r'matches', MatchViewSet, basename='match')
router.register(r'tickets', TicketViewSet, basename='ticket')

urlpatterns = [
    path('', include(router.urls)),
]
