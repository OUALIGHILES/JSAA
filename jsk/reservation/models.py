# reservation/models.py
from django.db import models
from django.conf import settings
from match_future.models import Match, Section, TicketCategory

class Seat(models.Model):
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='seats')
    row = models.CharField(max_length=5)  # A, B, C... ou 1, 2, 3...
    number = models.IntegerField()  # 1, 2, 3...
    is_reserved = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)  # Peut être désactivé pour maintenance
    
    class Meta:
        unique_together = ('section', 'row', 'number')
    
    def __str__(self):
        return f"{self.section} - Rangée {self.row}, Siège {self.number}"

class Reservation(models.Model):
    STATUS_CHOICES = (
        ('pending', 'En attente'),
        ('confirmed', 'Confirmée'),
        ('cancelled', 'Annulée'),
        ('expired', 'Expirée'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reservations')
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='reservations')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    reservation_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expiration_date = models.DateTimeField()  # Date après laquelle la réservation expire si non payée
    
    def __str__(self):
        return f"{self.user.username} - {self.match} - {self.status}"
    
    @property
    def total_price(self):
        total = sum(item.seat.section.category.price for item in self.items.all())
        return total

class ReservationItem(models.Model):
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE, related_name='items')
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE, related_name='reservations')
    
    class Meta:
        unique_together = ('reservation', 'seat')
    
    def __str__(self):
        return f"{self.reservation} - {self.seat}"