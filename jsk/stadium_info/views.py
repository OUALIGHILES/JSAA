# stadium_info/views.py
from rest_framework import generics
from .models import StadiumInfo
from .serializers import StadiumInfoSerializer

# Vue pour lister et créer des informations sur le stade
class StadiumInfoListCreateAPIView(generics.ListCreateAPIView):
    queryset = StadiumInfo.objects.all()
    serializer_class = StadiumInfoSerializer

# Vue pour récupérer, mettre à jour et supprimer une information sur le stade par son id (pk)
class StadiumInfoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = StadiumInfo.objects.all()
    serializer_class = StadiumInfoSerializer
