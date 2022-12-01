from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from modules.django_clients.clients.api.v1.serializers import ClientSerializer, ReviewSerializer
from modules.django_clients.clients.models import Clients
from modules.django_services_provider.services_provider.models import Review


class CreateClientView(ModelViewSet):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Clients.objects.filter(user=self.request.user)


class ClientReviewView(ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.all()