from django.contrib import admin
from .models import Appointment


class Appointments(admin.ModelAdmin):
    list_display = ["service_provider", "client", "name", "selected_date"]
    list_filter = ["service_provider", "client"]


# Register your models here.
admin.site.register(Appointment, Appointments)