# payment/serializers.py
from rest_framework import serializers
from django.db import transaction
from .models import Payment, CardInfo
from reservation.models import Reservation

class CardInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardInfo
        fields = ('card_last_four', 'card_holder_name', 'expiry_month', 'expiry_year')

class PaymentSerializer(serializers.ModelSerializer):
    card_info = CardInfoSerializer(required=False)
    reservation_id = serializers.PrimaryKeyRelatedField(
        queryset=Reservation.objects.all(),
        source='reservation',
        write_only=True
    )
    
    class Meta:
        model = Payment
        fields = ('id', 'reservation', 'reservation_id', 'amount', 'payment_method', 
                 'transaction_id', 'status', 'payment_date', 'updated_at', 'card_info')
        read_only_fields = ('id', 'transaction_id', 'status', 'payment_date', 'updated_at')
    
    def validate_reservation_id(self, value):
        if value.status != 'pending':
            raise serializers.ValidationError("Cette réservation n'est pas en attente de paiement.")
        if hasattr(value, 'payment'):
            raise serializers.ValidationError("Un paiement existe déjà pour cette réservation.")
        if value.user != self.context['request'].user:
            raise serializers.ValidationError("Vous n'êtes pas autorisé à payer cette réservation.")
        return value
    
    def validate(self, attrs):
        payment_method = attrs.get('payment_method')
        card_info = attrs.get('card_info')
        
        if payment_method == 'card' and not card_info:
            raise serializers.ValidationError({"card_info": "Les informations de carte sont requises pour ce mode de paiement."
            })