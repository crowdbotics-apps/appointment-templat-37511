from django.db.models import Sum, Q, Count
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet

from modules.django_services_provider.services_provider.api.v1.serializers import CategorySerializer, ServiceProviderSerializer, LocationSerializer, \
    AppointmentSerializer, MeetingInfoSerializer

from modules.django_services_provider.services_provider.models import Category, ServiceProvider, Location, Appointment, MeetingInformation


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


class AppointmentView(ModelViewSet):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

    def get_queryset(self):
        queryset = self.queryset.select_related("service_provider", "client")
        if self.request.user.id:
            queryset = queryset.filter(Q(client__user=self.request.user) | Q(service_provider__user=self.request.user))
        return queryset

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
