from rest_framework import serializers
from .models import Stadium, Match, Ticket

class StadiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stadium
        fields = '__all__'


class MatchSerializer(serializers.ModelSerializer):
    stadium = StadiumSerializer(read_only=True)
    stadium_id = serializers.PrimaryKeyRelatedField(queryset=Stadium.objects.all(), source='stadium', write_only=True)

    class Meta:
        model = Match
        fields = ['id', 'stadium', 'stadium_id', 'team_a', 'team_b', 'date', 'price']


class TicketSerializer(serializers.ModelSerializer):
    match = MatchSerializer(read_only=True)
    match_id = serializers.PrimaryKeyRelatedField(queryset=Match.objects.all(), source='match', write_only=True)

    class Meta:
        model = Ticket
        fields = ['id', 'match', 'match_id', 'user', 'seat_number', 'is_paid', 'reservation_date']
        read_only_fields = ['user', 'is_paid', 'reservation_date']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
