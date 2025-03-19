# payment/models.py
from django.db import models
from reservation.models import Reservation
import uuid

class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = (
        ('card', 'Carte El Dahabiya'),
        ('bank_transfer', 'Virement bancaire'),
        ('onsite', 'Sur place'),
    )
    
    STATUS_CHOICES = (
        ('pending', 'En attente'),
        ('processing', 'En cours de traitement'),
        ('completed', 'Complété'),
        ('failed', 'Échoué'),
        ('refunded', 'Remboursé'),
    )
    
    reservation = models.OneToOneField(Reservation, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    transaction_id = models.CharField(max_length=100, unique=True, default=uuid.uuid4)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Payment gateway response fields
    gateway_reference = models.CharField(max_length=100, blank=True, null=True)
    gateway_response = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"Payment {self.transaction_id} - {self.reservation}"

class CardInfo(models.Model):
    payment = models.OneToOneField(Payment, on_delete=models.CASCADE, related_name='card_info')
    card_last_four = models.CharField(max_length=4)  # Last 4 digits only (for security)
    card_holder_name = models.CharField(max_length=100)
    expiry_month = models.CharField(max_length=2)
    expiry_year = models.CharField(max_length=4)
    
    def __str__(self):
        return f"Card ending in {self.card_last_four} for {self.payment}"
