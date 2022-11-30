from django.db.models import Q, Sum
from rest_framework import viewsets
from rest_framework.response import Response

from modules.django_services_provider.services_provider.models import ServiceProvider, MeetingInformation
from .serializers import AppointmentSerializer
from .models import Appointment


class AppointmentViewSet(viewsets.ModelViewSet):
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
        data['additional_fee'] = mt.get('fees')
        data['total'] = mt.get('fees') + sp.appointment_fee
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)