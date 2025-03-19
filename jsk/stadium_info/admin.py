from django.contrib import admin
from django.utils.html import format_html
from .models import StadiumInfo

@admin.register(StadiumInfo)
class StadiumInfoAdmin(admin.ModelAdmin):
    # الأعمدة التي ستظهر في قائمة الإدارة
    list_display = ('name', 'location', 'capacity', 'created_at', 'stadium_thumbnail')
    # إمكانية البحث في الحقول التالية
    search_fields = ('name', 'location', 'description')
    # إضافة فلتر حسب الموقع والسعة
    list_filter = ('location', 'capacity')
    # ترتيب النتائج حسب الاسم
    ordering = ('name',)
    # جعل بعض الحقول للعرض فقط
    readonly_fields = ('created_at', 'updated_at', 'stadium_thumbnail')
    
    # تقسيم واجهة تحرير النموذج إلى أقسام منظمة
    fieldsets = (
        ('Informations de base', {
            'fields': ('name', 'location', 'capacity', 'description')
        }),
        ('Médias & Installations', {
            'fields': ('image', 'stadium_thumbnail', 'facilities'),
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),  # هذا القسم يتم طيه افتراضيًا
        }),
    )
    
    # دالة مخصصة لعرض صورة مصغرة للملعب (إذا وُجدت)
    def stadium_thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="60" style="object-fit: cover;" />', obj.image.url)
        return "Pas d'image"
    stadium_thumbnail.short_description = "Aperçu de l'image"
