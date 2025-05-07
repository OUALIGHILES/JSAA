# matches/serializers.py
from rest_framework import serializers
from .models import Team, Match, TicketCategory, Section

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    total_seats = serializers.SerializerMethodField()
    
    class Meta:
        model = Section
        fields = ('id', 'name', 'row_count', 'seats_per_row', 'total_seats')
    
    def get_total_seats(self, obj):
        return obj.get_total_seats()

class TicketCategorySerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)
    available_seats = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = TicketCategory
        fields = ('id', 'name', 'price', 'capacity', 'color_code', 'description', 'sections', 'available_seats')

class MatchSerializer(serializers.ModelSerializer):
    home_team = TeamSerializer(read_only=True)
    away_team = TeamSerializer(read_only=True)
    ticket_categories = TicketCategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Match
        fields = ('id', 'home_team', 'away_team', 'match_date', 'match_type', 
                 'description', 'is_featured', 'is_sold_out', 'ticket_categories')

class MatchListSerializer(serializers.ModelSerializer):
    home_team = TeamSerializer(read_only=True)
    away_team = TeamSerializer(read_only=True)
    
    class Meta:
        model = Match
        fields = ('id', 'home_team', 'away_team', 'match_date', 'match_type', 'is_featured', 'is_sold_out')
