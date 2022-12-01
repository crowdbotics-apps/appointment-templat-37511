import uuid as uuid

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from modules.django_clients.clients.models import TimeStamp, Clients
from multiselectfield import MultiSelectField

from users.models import User


class Category(TimeStamp):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models. ImageField()

    def __str__(self):
        return self.title


class ServiceProvider(TimeStamp):
    WEEK_DAYS = (
        ("Mon", "Monday"),
        ("Tue", "Tuesday"),
        ("Wed", "Wednesday"),
        ("Thu", "Thursday"),
        ("Fri", "Friday"),
        ("Sat", "Saturday"),
        ("Sun", "Sunday"),
    )

    GENDER = [
        ('male', 'Male'),
        ('female', 'Female')
    ]
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='categories')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='service_provider_user')
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    gender = models.CharField(max_length=6, choices=GENDER)
    biography = models.TextField()
    experience = models.PositiveIntegerField()
    available_days = MultiSelectField(choices=WEEK_DAYS)
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    appointment_fee = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField()

    def __str__(self):
        return str(self.name)


class MeetingInformation(TimeStamp):
    MEETING_TYPE = [
        ('message', 'Messaging'),
        ('voice', 'Voice Call'),
        ('video', 'Video Call'),
    ]
    service_provider = models.ForeignKey(ServiceProvider, on_delete=models.CASCADE, related_name='service_provider_fee_info')
    meeting_type = models.CharField(max_length=10, choices=MEETING_TYPE)
    meeting_type_detail = models.TextField()
    fees = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.meeting_type


class Location(TimeStamp):
    location_service_provide = models.ForeignKey(ServiceProvider, on_delete=models.CASCADE, related_name='locations')
    lat = models.FloatField()
    lng = models.FloatField()
    address = models.CharField(max_length=200)

    def __str__(self):
        return self.address


class Review(TimeStamp):
    to_service_provider = models.ForeignKey(ServiceProvider, on_delete=models.CASCADE, related_name='review_service_prov')
    from_client = models.ForeignKey(Clients, on_delete=models.CASCADE, related_name='client_review')
    comment = models.TextField()
    rating = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])

    def __str__(self):
        return self.comment
