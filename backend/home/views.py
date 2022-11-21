from multiprocessing import Value

from django.shortcuts import render
from home.api.v1.serializers import *
from django.db.models import OuterRef, Q, Sum, Avg, F
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.generics import ListCreateAPIView, ListAPIView
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


class CategoryView(ListCreateAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()


class CreateServiceProviderView(ListCreateAPIView):
    serializer_class = ServiceProviderSerializer

    def get(self, request, *args, **kwargs):
        queryset3 = {'location_service_provide__user': self.request.user}
        location = Location.objects.filter(**queryset3).values('location_service_provide__name', 'address', 'lng', 'lat')
        queryset1 = {'user': self.request.user}
        detail = ServiceProvider.objects.filter(**queryset1).values('uuid', 'name', 'category', 'gender', 'speciality', 'available_days', 'opening_time', 'closing_time', 'experience')
        queryset = {'to_service_provider__user': self.request.user}
        reviews = Review.objects.filter(**queryset).values('to_service_provider__name', 'to_service_provider__category__title').annotate(Rating=Avg('rating'), Reviews=Sum('from_client'))
        return Response({'Service Provider': detail, 'Reviews': reviews, 'Location': location})


class CreateLocationView(ListCreateAPIView):
    serializer_class = LocationSerializer

    def get_queryset(self):
        return Location.objects.filter(location_service_provide__user=self.request.user)


class CreateClientView(ListCreateAPIView):
    serializer_class = ClientPatientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Clients.objects.filter(user=self.request.user)


class ClientReviewView(ListCreateAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

    def get_queryset(self):
        return Review.objects.all()


class AppointmentView(ListCreateAPIView):
    serializer_class = AppointmentSerializer
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        cal = Appointment.objects.filter(Q(client__user=self.request.user) | Q(service_provider__user=self.request.user)).values().annotate(totals=Sum('appointment_cost') + Sum('additional_fee'))
        return Appointment.objects.filter(Q(client__user=self.request.user) | Q(service_provider__user=self.request.user)).update(total=cal)


class MeetingInfoView(ListCreateAPIView):
    serializer_class = MeetingInfoSerializer

    def get_queryset(self):
        return MeetingInformation.objects.all()

