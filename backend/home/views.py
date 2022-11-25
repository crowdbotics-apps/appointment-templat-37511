from django.shortcuts import render
from django.db.models import Q, Sum, Avg, Count
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView
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


    # def get(self, request, *args, **kwargs):
    #     location = Location.objects.filter(location_service_provide__user=self.request.user).values('location_service_provide__name', 'address', 'lng', 'lat')
    #     detail = ServiceProvider.objects.filter(user=self.request.user).values('uuid', 'name', 'category', 'gender', 'speciality', 'available_days', 'opening_time', 'closing_time', 'experience')
    #     reviews = Review.objects.filter(to_service_provider__user=self.request.user).values('to_service_provider__name', 'to_service_provider__category__title').annotate(Rating=Avg('rating'), Reviews=Count('from_client'))
    #     return Response({'service_provider': detail, 'reviews': reviews, 'location': location})


class CreateLocationView(ReadOnlyModelViewSet):
    serializer_class = LocationSerializer

    def get_queryset(self):
        return Location.objects.filter(location_service_provide__user=self.request.user)


class CreateClientView(ModelViewSet):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]
    queryset = Clients.objects.all()

    def get_queryset(self):
        return Clients.objects.filter(user=self.request.user)


class ClientReviewView(ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

    def get_queryset(self):
        return Review.objects.all()


class AppointmentView(ModelViewSet):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

    def get_queryset(self):
        return Appointment.objects.filter(Q(client__user=self.request.user) | Q(service_provider__user=self.request.user))


class MeetingInfoView(ReadOnlyModelViewSet):
    serializer_class = MeetingInfoSerializer
    queryset = MeetingInformation.objects.all()

    def get_queryset(self):
        queryset = self.queryset.all()
        service_provider = self.request.query_params.get("service_provider")
        if service_provider:
            queryset = queryset.filter(service_provider_id=int(service_provider))
        return queryset
