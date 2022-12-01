from django.db import models
from modules.django_clients.clients.models import Clients, TimeStamp
from modules.django_services_provider.services_provider.models import ServiceProvider, MeetingInformation


class Appointment(TimeStamp):
    SESSION_DAY = [
        ('morning', 'Morning'),
        ('afternoon', 'Afternoon'),
        ('evening', 'Evening'),
        ('night', 'Night'),
    ]
    GENDER = [
        ('male', 'Male'),
        ('female', 'Female')
    ]
    service_provider = models.ForeignKey(ServiceProvider, on_delete=models.CASCADE,
                                         related_name='appointment_service_provider')
    client = models.ForeignKey(Clients, on_delete=models.CASCADE, related_name='appointment_client')
    selected_date = models.DateField()
    session = models.CharField(max_length=9, choices=SESSION_DAY)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_available = models.BooleanField(default=False)
    name = models.CharField(max_length=40)
    email = models.EmailField(null=True, blank=True)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=7, choices=GENDER)
    add_note = models.TextField()
    appointment_cost = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    additional_fee = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    sub_total = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    discount = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    total = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    appointment_type = models.ManyToManyField(MeetingInformation, related_name='appointment_meeting_type')

    def __str__(self):
        return str(self.name)
