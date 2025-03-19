from django.contrib import admin
from .models import Seat, Reservation, ReservationItem

# Inline pour afficher ReservationItem داخل صفحة تفاصيل Reservation
class ReservationItemInline(admin.TabularInline):
    model = ReservationItem
    extra = 0  # لا تظهر أي صفوف إضافية فارغة تلقائيًا
    # يمكن تعديل الحقول التي تريد عرضها هنا، إذا أردت
    # readonly_fields = ('seat',)  # إذا كنت تريد جعل حقل المقعد للعرض فقط

@admin.register(Seat)
class SeatAdmin(admin.ModelAdmin):
    list_display = ('section', 'row', 'number', 'is_reserved', 'is_active')
    list_filter = ('section', 'is_reserved', 'is_active')
    search_fields = ('section__name', 'row', 'number')
    ordering = ('section', 'row', 'number')
    # يمكنك تخصيص fieldsets لتقسيم الحقول في واجهة التحرير إن رغبت
    fieldsets = (
        (None, {
            'fields': ('section', 'row', 'number')
        }),
        ('Statut', {
            'fields': ('is_reserved', 'is_active'),
        }),
    )

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('user', 'match', 'status', 'reservation_date', 'expiration_date', 'total_price')
    list_filter = ('status', 'reservation_date', 'expiration_date')
    search_fields = ('user__username', 'match__team_a', 'match__team_b')  # افترض أن نموذج Match يحتوي على team_a و team_b
    ordering = ('-reservation_date',)
    # إضافة ReservationItem inline لعرض المقاعد المحجوزة داخل تفاصيل الحجز
    inlines = [ReservationItemInline]
    # جعل الحقل total_price للعرض فقط لأنه محسوب
    readonly_fields = ('total_price',)

@admin.register(ReservationItem)
class ReservationItemAdmin(admin.ModelAdmin):
    list_display = ('reservation', 'seat')
    search_fields = ('reservation__user__username', 'seat__section__name', 'seat__row', 'seat__number')
    ordering = ('reservation', 'seat')
