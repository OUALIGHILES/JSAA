# matches/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamViewSet, MatchViewSet, TicketCategoryViewSet, SectionViewSet

router = DefaultRouter()
router.register(r'teams', TeamViewSet)
router.register(r'matches', MatchViewSet)
router.register(r'categories', TicketCategoryViewSet)
router.register(r'sections', SectionViewSet)

app_name = 'matches'

urlpatterns = [
    path('', include(router.urls)),
]