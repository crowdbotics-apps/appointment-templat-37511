from rest_framework import serializers

from modules.django_services_provider.services_provider.api.v1.serializers import ServiceProviderSerializer, \
    MeetingInfoSerializer

from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    servicer_detail = ServiceProviderSerializer(source='service_provider', read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["appointment_type"] = MeetingInfoSerializer(instance.appointment_type.all(), many=True).data
        return rep

    def validate(self, data):
        if not self.instance:
            if Appointment.objects.filter(
                    start_time__lt=data['end_time'],
                    end_time__gt=data['start_time']).exists():
                raise serializers.ValidationError(
                    f'This appointment slot is already booked for {data["service_provider"]}.')
            return data