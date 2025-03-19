# reservation_project/urls.py
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
    path('reservation/', include('reservation.urls')),
    path('payment/', include('payment.urls')),
    path('api/tickets/', include('tickets.urls')),
    path('api/stadium_info/', include('stadium_info.urls')),
    path('api/', include('api.urls')),
    path('', lambda request: HttpResponse("""
        <h1>Bienvenue sur l'application JSK!</h1>
        <ul>
            <li><a href='/auth/'>Auth</a></li>
            <li><a href='/reservation/'>Reservation</a></li>
            <li><a href='/payment/'>Payment</a></li>
            <li><a href='/api/tickets/'>API Tickets</a></li>
            <li><a href='/api/stadium_info/'>API Stadium Info</a></li>
        </ul>
    """)),
]
