# stadium_info/serializers.py
from rest_framework import serializers
from .models import StadiumInfo

class StadiumInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StadiumInfo
        fields = '__all__'
