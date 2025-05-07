# stadium_info/urls.py
from django.urls import path
from .views import StadiumInfoListCreateAPIView, StadiumInfoRetrieveUpdateDestroyAPIView

app_name = "stadium_info"

urlpatterns = [
    path('', StadiumInfoListCreateAPIView.as_view(), name='stadium_info_list_create'),
    path('<int:pk>/', StadiumInfoRetrieveUpdateDestroyAPIView.as_view(), name='stadium_info_detail'),
]
