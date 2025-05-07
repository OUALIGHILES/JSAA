# matches/models.py
from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='team_logos/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    founded_year = models.IntegerField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class Match(models.Model):
    MATCH_TYPE_CHOICES = (
        ('championship', 'Championnat'),
        ('cup', 'Coupe'),
        ('friendly', 'Amical'),
        ('international', 'International'),
    )
    
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_matches')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_matches')
    match_date = models.DateTimeField()
    match_type = models.CharField(max_length=20, choices=MATCH_TYPE_CHOICES)
    description = models.TextField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    is_sold_out = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Matches"
        ordering = ['match_date']

    def __str__(self):
        return f"{self.home_team} vs {self.away_team} - {self.match_date}"

class TicketCategory(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='ticket_categories')
    name = models.CharField(max_length=50)  # VIP, MoiVIP, Ultras, Normal
    price = models.DecimalField(max_digits=10, decimal_places=2)
    capacity = models.PositiveIntegerField()
    color_code = models.CharField(max_length=10, blank=True, null=True)  # Pour la visualisation
    description = models.TextField(blank=True, null=True)
    
    class Meta:
        verbose_name_plural = "Ticket Categories"
        unique_together = ('match', 'name')
    
    def __str__(self):
        return f"{self.name} - {self.match}"
    
    @property
    def available_seats(self):
        from reservation.models import Seat  # Import here to avoid circular imports
        reserved_seats = Seat.objects.filter(section__category=self, is_reserved=True).count()
        return self.capacity - reserved_seats

class Section(models.Model):
    category = models.ForeignKey(TicketCategory, on_delete=models.CASCADE, related_name='sections')
    name = models.CharField(max_length=50)  # e.g., "North VIP", "South Ultras"
    row_count = models.PositiveIntegerField()
    seats_per_row = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.name} - {self.category.name}"
    
    def get_total_seats(self):
        return self.row_count * self.seats_per_row
