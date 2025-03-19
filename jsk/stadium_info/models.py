# stadium_info/models.py
from django.db import models

class StadiumInfo(models.Model):
    name = models.CharField(max_length=255, help_text="Nom du stade")
    location = models.CharField(max_length=255, help_text="Emplacement du stade")
    capacity = models.PositiveIntegerField(help_text="Capacité du stade")
    description = models.TextField(help_text="Description détaillée du stade")
    image = models.ImageField(upload_to='stadium_info/', blank=True, null=True, help_text="Image du stade")
    facilities = models.TextField(blank=True, null=True, help_text="Liste des installations disponibles au stade (ex. parking, restauration, sanitaires, etc.)")
    created_at = models.DateTimeField(auto_now_add=True, help_text="Date de création de l'information")
    updated_at = models.DateTimeField(auto_now=True, help_text="Dernière mise à jour")

    def __str__(self):
        return self.name
