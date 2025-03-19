# reservation/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from django.utils import timezone
from .models import Seat, Reservation, ReservationItem
from .serializers import SeatSerializer, ReservationSerializer, ReservationListSerializer

class SeatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = Seat.objects.all()
        section_id = self.request.query_params.get('section_id', None)
        if section_id is not None:
            queryset = queryset.filter(section_id=section_id)
        match_id = self.request.query_params.get('match_id', None)
        if match_id is not None:
            queryset = queryset.filter(section__category__match_id=match_id)
        category_id = self.request.query_params.get('category_id', None)
        if category_id is not None:
            queryset = queryset.filter(section__category_id=category_id)
        return queryset
    
    @action(detail=False, methods=['get'])
    def available(self):
        queryset = self.get_queryset().filter(is_reserved=False, is_active=True)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class ReservationViewSet(viewsets.ModelViewSet):
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Reservation.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ReservationListSerializer
        return ReservationSerializer
    
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        reservation = self.get_object()
        
        if reservation.status != 'pending':
            return Response(
                {"detail": "Seules les réservations en attente peuvent être annulées."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Release all reserved seats
        for item in reservation.items.all():
            seat = item.seat
            seat.is_reserved = False
            seat.save()
        
        # Update reservation status
        reservation.status = 'cancelled'
        reservation.save()
        
        return Response({"detail": "Réservation annulée avec succès."})
