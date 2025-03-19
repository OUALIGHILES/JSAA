from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Payment
from .serializers import PaymentSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]  # فقط المستخدمين المسجلين يمكنهم إنشاء الدفع

    def get_queryset(self):
        # إرجاع فقط الدفعات التي تخص المستخدم الحالي
        return Payment.objects.filter(reservation__user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        # نمرر المستخدم في السياق إلى السيريالايزر حتى يتمكن من التحقق من صاحب الحجز
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
