from django.urls import path
from . import views

urlpatterns = [
    # Endpoints pour les matchs
    path('matches/', views.MatchListCreateView.as_view(), name='match-list'),
    path('matches/<int:pk>/', views.MatchDetailView.as_view(), name='match-detail'),

    # Endpoints pour les stades
    path('stadiums/', views.StadiumListCreateView.as_view(), name='stadium-list'),
    path('stadiums/<int:pk>/', views.StadiumDetailView.as_view(), name='stadium-detail'),
]