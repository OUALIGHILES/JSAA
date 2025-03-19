from django.contrib import admin
from .models import Team, Match, TicketCategory, Section

# ✅ إدارة نموذج Team
@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'founded_year')
    search_fields = ('name',)
    list_filter = ('founded_year',)
    readonly_fields = ('founded_year',)
    ordering = ('name',)
    fieldsets = (
        (None, {'fields': ('name', 'logo')}),
        ('Informations supplémentaires', {'fields': ('description', 'founded_year')}),
    )

# ✅ إدارة نموذج Match
@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('home_team', 'away_team', 'match_date', 'match_type', 'is_featured', 'is_sold_out')
    list_filter = ('match_type', 'is_featured', 'is_sold_out')
    search_fields = ('home_team__name', 'away_team__name', 'match_type')
    ordering = ('match_date',)
    date_hierarchy = 'match_date'
    fieldsets = (
        (None, {'fields': ('home_team', 'away_team', 'match_date', 'match_type')}),
        ('Détails', {'fields': ('description', 'is_featured', 'is_sold_out')}),
    )

# ✅ إدارة نموذج TicketCategory
@admin.register(TicketCategory)
class TicketCategoryAdmin(admin.ModelAdmin):
    list_display = ('match', 'name', 'price', 'capacity', 'available_seats')
    list_filter = ('match__match_type', 'name')
    search_fields = ('match__home_team__name', 'match__away_team__name', 'name')
    readonly_fields = ('available_seats',)
    ordering = ('match', 'name')
    fieldsets = (
        (None, {'fields': ('match', 'name', 'price', 'capacity', 'color_code')}),
        ('Détails', {'fields': ('description',)}),
    )

# ✅ إدارة نموذج Section
@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'row_count', 'seats_per_row', 'total_seats_display')
    search_fields = ('name', 'category__name')
    list_filter = ('category__name',)
    ordering = ('category', 'name')
    fieldsets = (
        (None, {'fields': ('category', 'name')}),
        ('Configuration des sièges', {'fields': ('row_count', 'seats_per_row')}),
    )

    # لعرض العدد الكلي للمقاعد
    def total_seats_display(self, obj):
        return obj.get_total_seats()
    total_seats_display.short_description = 'Total Seats'

