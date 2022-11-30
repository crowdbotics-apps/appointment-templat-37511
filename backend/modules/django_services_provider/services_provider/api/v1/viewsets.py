from django.db.models import Sum, Q, Count
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet

from modules.django_services_provider.services_provider.api.v1.serializers import CategorySerializer, ServiceProviderSerializer, LocationSerializer, \
     MeetingInfoSerializer

from modules.django_services_provider.services_provider.models import Category, ServiceProvider, Location, MeetingInformation


class CategoryView(ReadOnlyModelViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()


class CreateServiceProviderView(ModelViewSet):
    serializer_class = ServiceProviderSerializer

    def get_queryset(self):
        queryset = ServiceProvider.objects.select_related("category", "user").prefetch_related('locations', 'review_service_prov')
        if self.request.user.id:
            queryset = queryset.filter(user=self.request.user)
        return queryset


class CreateLocationView(ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()

    def get_queryset(self):
        queryset = self.queryset.all()
        service_provider = self.request.query_params.get("location_service_provide")
        if service_provider:
            queryset = queryset.filter(location_service_provide_id=int(service_provider))
        return queryset


class MeetingInfoView(ReadOnlyModelViewSet):
    serializer_class = MeetingInfoSerializer
    queryset = MeetingInformation.objects.all()

    def get_queryset(self):
        queryset = self.queryset.all()
        service_provider = self.request.query_params.get("service_provider")
        if service_provider:
            queryset = queryset.filter(service_provider_id=int(service_provider))
        return queryset
