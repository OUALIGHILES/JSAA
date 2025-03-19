from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

# 👇 هذا الكلاس يخصص لوحة تحكم المستخدم في Django Admin
class CustomUserAdmin(UserAdmin):
    # الحقول التي ستظهر في قائمة المستخدمين داخل لوحة التحكم
    list_display = (
        'username', 'email', 'first_name', 'last_name', 
        'supporter_type', 'phone_number', 'is_staff', 'is_active'
    )
    
    # الحقول التي يمكن البحث عنها
    search_fields = ('username', 'email', 'phone_number', 'supporter_type')
    
    # ترتيب النتائج حسب
    ordering = ('-date_joined',)
    
    # الحقول التي تظهر عند فتح تفاصيل المستخدم في لوحة التحكم
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Informations personnelles', {'fields': ('first_name', 'last_name', 'email', 'date_of_birth', 'address', 'phone_number', 'profile_picture', 'supporter_type')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Dates importantes', {'fields': ('last_login', 'date_joined')}),
    )
    
    # الحقول التي تظهر عند إضافة مستخدم جديد
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'first_name', 'last_name', 'password1', 'password2', 'supporter_type', 'phone_number', 'address', 'date_of_birth', 'profile_picture', 'is_staff', 'is_active')}
        ),
    )

# ربط النموذج المخصص مع لوحة تحكم الإدارة
admin.site.register(CustomUser, CustomUserAdmin)
