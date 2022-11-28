from django.shortcuts import render
from django.db.models import Q, Sum
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from home.api.v1.serializers import *


def home(request):
    packages = [
        {'name': 'django-allauth', 'url': 'https://pypi.org/project/django-allauth/0.38.0/'},
        {'name': 'django-bootstrap4', 'url': 'https://pypi.org/project/django-bootstrap4/0.0.7/'},
        {'name': 'djangorestframework', 'url': 'https://pypi.org/project/djangorestframework/3.9.0/'},
    ]
    context = {
        'packages': packages
    }
    return render(request, 'home/index.html', context)


class CategoryView(ReadOnlyModelViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()


class CreateServiceProviderView(ModelViewSet):
    serializer_class = ServiceProviderSerializer
    queryset = ServiceProvider.objects.all()

    def get_queryset(self):
        queryset = ServiceProvider.objects.select_related("category", "user").prefetch_related('locations', 'review_service_prov')
        if self.request.user.id:
            queryset = queryset.filter(user=self.request.user)
        return queryset


class CreateLocationView(ReadOnlyModelViewSet):
    serializer_class = LocationSerializer

    def get_queryset(self):
        return Location.objects.all()


class CreateClientView(ModelViewSet):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Clients.objects.filter(user=self.request.user)


class ClientReviewView(ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.all()


class AppointmentView(ModelViewSet):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

    def get_queryset(self):
        queryset = self.queryset.all()
        return queryset.filter(Q(client__user=self.request.user) | Q(service_provider__user=self.request.user))

    def create(self, request, *args, **kwargs):
        data = request.data
        sp = ServiceProvider.objects.get(id=data['service_provider'])
        data['appointment_cost'] = sp.appointment_fee
        mt = MeetingInformation.objects.filter(id__in=data['appointment_type']).aggregate(fees=Sum('fees'))
        data['additional_fee'] = mt.get('fees', 0)
        data['total'] = mt.get('fees', 0) + sp.appointment_fee
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class MeetingInfoView(ReadOnlyModelViewSet):
    serializer_class = MeetingInfoSerializer
    queryset = MeetingInformation.objects.all()

    def get_queryset(self):
        queryset = self.queryset.all()
        service_provider = self.request.query_params.get("service_provider")
        if service_provider:
            queryset = queryset.filter(service_provider_id=int(service_provider))
        return queryset
