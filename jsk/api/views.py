from rest_framework import generics, permissions
from match_future.models import Match
from stadium_info.models import StadiumInfo
from .serializers import MatchSerializer, StadiumSerializer

# Vue pour la liste et la création des matchs
class MatchListCreateView(generics.ListCreateAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Sécurité

# Vue pour les détails, la mise à jour et la suppression d'un match
class MatchDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Vue pour la liste et la création des stades
class StadiumListCreateView(generics.ListCreateAPIView):
    queryset = StadiumInfo.objects.all()  # ✅ Correction ici
    serializer_class = StadiumSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Vue pour les détails, la mise à jour et la suppression d'un stade
class StadiumDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = StadiumInfo.objects.all()  # ✅ Correction ici
    serializer_class = StadiumSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
