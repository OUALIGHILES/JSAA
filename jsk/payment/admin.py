from django.contrib import admin
from .models import Payment, CardInfo

# ✅ إدارة نموذج Payment
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('transaction_id', 'reservation', 'amount', 'payment_method', 'status', 'payment_date', 'updated_at')
    list_filter = ('payment_method', 'status', 'payment_date')
    search_fields = ('transaction_id', 'reservation__id', 'gateway_reference')
    ordering = ('-payment_date',)
    readonly_fields = ('transaction_id', 'payment_date', 'updated_at')
    fieldsets = (
        (None, {'fields': ('reservation', 'amount', 'payment_method')}),
        ('Transaction', {'fields': ('transaction_id', 'status', 'payment_date', 'updated_at')}),
        ('Gateway Response', {'fields': ('gateway_reference', 'gateway_response')}),
    )

# ✅ إدارة نموذج CardInfo
@admin.register(CardInfo)
class CardInfoAdmin(admin.ModelAdmin):
    list_display = ('payment', 'card_last_four', 'card_holder_name', 'expiry_month', 'expiry_year')
    search_fields = ('card_last_four', 'card_holder_name', 'payment__transaction_id')
    ordering = ('payment',)
    fieldsets = (
        (None, {'fields': ('payment', 'card_last_four', 'card_holder_name')}),
        ('Expiration', {'fields': ('expiry_month', 'expiry_year')}),
    )
