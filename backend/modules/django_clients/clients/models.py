from django.db import models
import uuid

from users.models import User


class TimeStamp(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        abstract = True


class Clients(TimeStamp):
    GENDER = [
        ('male', 'Male'),
        ('female', 'Female')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='client_user')
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=50)
    image = models.ImageField()
    email = models.EmailField(unique=True)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=7, choices=GENDER)
    notes = models.TextField()

    def __str__(self):
        return self.full_name


