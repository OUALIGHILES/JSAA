# reservation/serializers.py
from rest_framework import serializers
from django.utils import timezone
from datetime import timedelta
from .models import Seat, Reservation, ReservationItem
from match_future.models import Match, Section, TicketCategory
from match_future.serializers import MatchSerializer

class SeatSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='section.category.name')
    category_price = serializers.ReadOnlyField(source='section.category.price')
    section_name = serializers.ReadOnlyField(source='section.name')
    
    class Meta:
        model = Seat
        fields = ('id', 'section', 'section_name', 'row', 'number', 'is_reserved', 'is_active', 'category_name', 'category_price')

class ReservationItemSerializer(serializers.ModelSerializer):
    seat = SeatSerializer(read_only=True)
    seat_id = serializers.PrimaryKeyRelatedField(queryset=Seat.objects.all(), write_only=True)
    
    class Meta:
        model = ReservationItem
        fields = ('id', 'seat', 'seat_id')
    
    def validate_seat_id(self, value):
        if value.is_reserved:
            raise serializers.ValidationError("Ce siège est déjà réservé.")
        if not value.is_active:
            raise serializers.ValidationError("Ce siège n'est pas disponible.")
        return value

class ReservationSerializer(serializers.ModelSerializer):
    items = ReservationItemSerializer(many=True)
    match = MatchSerializer(read_only=True)
    match_id = serializers.PrimaryKeyRelatedField(queryset=Match.objects.all(), write_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = Reservation
        fields = ('id', 'user', 'match', 'match_id', 'status', 'reservation_date', 
                 'updated_at', 'expiration_date', 'items', 'total_price')
        read_only_fields = ('id', 'user', 'status', 'reservation_date', 'updated_at', 'expiration_date')
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        match = validated_data.pop('match_id')
        
        # Set expiration date (e.g., 30 minutes from now)
        expiration_date = timezone.now() + timedelta(minutes=30)
        
        reservation = Reservation.objects.create(
            user=self.context['request'].user,
            match=match,
            expiration_date=expiration_date,
            **validated_data
        )
        
        # Create reservation items and mark seats as reserved
        for item_data in items_data:
            seat = item_data.pop('seat_id')
            
            # Check if seat is already reserved
            if seat.is_reserved:
                # If we find a reserved seat, rollback all previous reservations
                for created_item in ReservationItem.objects.filter(reservation=reservation):
                    created_item.seat.is_reserved = False
                    created_item.seat.save()
                    created_item.delete()
                reservation.delete()
                raise serializers.ValidationError(f"Le siège {seat} a été réservé par quelqu'un d'autre.")
            
            # Mark seat as reserved
            seat.is_reserved = True
            seat.save()
            
            # Create reservation item
            ReservationItem.objects.create(reservation=reservation, seat=seat)
        
        return reservation

class ReservationListSerializer(serializers.ModelSerializer):
    items_count = serializers.SerializerMethodField()
    match_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Reservation
        fields = ('id', 'status', 'reservation_date', 'items_count', 'match_name')
    
    def get_items_count(self, obj):
        return obj.items.count()
    
    def get_match_name(self, obj):
        return f"{obj.match.home_team} vs {obj.match.away_team}"
