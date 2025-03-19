from rest_framework import viewsets, permissions
from .models import Stadium, Match, Ticket
from .serializers import StadiumSerializer, MatchSerializer, TicketSerializer

class StadiumViewSet(viewsets.ModelViewSet):
    queryset = Stadium.objects.all()
    serializer_class = StadiumSerializer
    permission_classes = [permissions.IsAdminUser]  # يمكن فقط للأدمن إضافة أو تعديل الملاعب


class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAdminUser]  # فقط الأدمن يمكنه إضافة المباريات


class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Ticket.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
