from rest_framework import serializers
from match_future.models import Match  # Exemple de modèle
from stadium_info.models import StadiumInfo  # Exemple de modèle

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['id', 'date', 'opponent', 'available_tickets']

class StadiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = StadiumInfo
        fields = ['id', 'name', 'description', 'capacity', 'address', 'image']