from django.db import models
from django.conf import settings 

class Stadium(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    capacity = models.PositiveIntegerField()

    def __str__(self):
        return self.name


class Match(models.Model):
    stadium = models.ForeignKey(Stadium, on_delete=models.CASCADE, related_name='matches')
    team_a = models.CharField(max_length=100)
    team_b = models.CharField(max_length=100)
    date = models.DateTimeField()
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.team_a} vs {self.team_b} at {self.stadium.name}"


class Ticket(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='tickets')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tickets')  # ✅ التغيير هنا
    seat_number = models.CharField(max_length=10)
    is_paid = models.BooleanField(default=False)
    reservation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ticket for {self.match} - Seat {self.seat_number}"
