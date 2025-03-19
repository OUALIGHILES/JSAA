# matches/views.py
from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Team, Match, TicketCategory, Section
from .serializers import TeamSerializer, MatchSerializer, MatchListSerializer, TicketCategorySerializer, SectionSerializer

class TeamViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.AllowAny]

class MatchViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Match.objects.all().order_by('match_date')
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return MatchListSerializer
        return MatchSerializer
    
    @action(detail=False, methods=['get'])
    def upcoming(self):
        from django.utils import timezone
        upcoming_matches = Match.objects.filter(match_date__gt=timezone.now()).order_by('match_date')
        serializer = MatchListSerializer(upcoming_matches, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def featured(self):
        featured_matches = Match.objects.filter(is_featured=True).order_by('match_date')
        serializer = MatchListSerializer(featured_matches, many=True)
        return Response(serializer.data)

class TicketCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TicketCategory.objects.all()
    serializer_class = TicketCategorySerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = TicketCategory.objects.all()
        match_id = self.request.query_params.get('match_id', None)
        if match_id is not None:
            queryset = queryset.filter(match_id=match_id)
        return queryset

class SectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = Section.objects.all()
        category_id = self.request.query_params.get('category_id', None)
        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)
        return queryset
