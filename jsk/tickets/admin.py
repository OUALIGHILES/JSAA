from django.contrib import admin
from .models import Stadium, Match, Ticket

@admin.register(Stadium)
class StadiumAdmin(admin.ModelAdmin):
    # Les colonnes affichées dans la liste des stades
    list_display = ('name', 'location', 'capacity')
    # Permet de rechercher un stade par nom ou localisation
    search_fields = ('name', 'location')
    # Filtrer la liste par localisation
    list_filter = ('location',)
    # Ordre d'affichage par nom de stade
    ordering = ('name',)
    # Optionnel : personnaliser la section d'édition
    fieldsets = (
        (None, {
            'fields': ('name', 'location', 'capacity')
        }),
    )

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    # Affiche les informations importantes d'un match
    list_display = ('team_a', 'team_b', 'stadium', 'date', 'price')
    # Permet de filtrer par stade et par date
    list_filter = ('stadium', 'date')
    # Recherche par nom des équipes ou nom du stade via la relation FK
    search_fields = ('team_a', 'team_b', 'stadium__name')
    # Tri par date décroissante (les matchs les plus récents en premier)
    ordering = ('-date',)
    # Affichage d'une hiérarchie de dates pour faciliter la navigation
    date_hierarchy = 'date'

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    # Affiche les informations essentielles du ticket
    list_display = ('match', 'user', 'seat_number', 'is_paid', 'reservation_date')
    # Filtre par statut de paiement et par date de réservation
    list_filter = ('is_paid', 'reservation_date')
    # Recherche par équipes (via le match), par nom d'utilisateur ou numéro de siège
    search_fields = ('match__team_a', 'match__team_b', 'user__username', 'seat_number')
    # Tri par date de réservation décroissante
    ordering = ('-reservation_date',)
