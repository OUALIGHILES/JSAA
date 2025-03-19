# authentication/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    SUPPORTER_TYPE_CHOICES = (
        ('regular', 'Regular'),
        ('ultras', 'Ultras'),
        ('vip', 'VIP'),
    )
    
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    supporter_type = models.CharField(max_length=20, choices=SUPPORTER_TYPE_CHOICES, default='regular')
    
    def __str__(self):
        return self.username
