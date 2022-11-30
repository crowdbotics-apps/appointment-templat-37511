from django.contrib import admin
from .models import *
# Register your models here.


class ReviewAdmin(admin.ModelAdmin):
    list_display = ["to_service_provider", "from_client", "rating"]


class Appointments(admin.ModelAdmin):
    list_display = ["service_provider", "client", "name", "selected_date"]
    list_filter = ["service_provider", "client"]


class Locations(admin.ModelAdmin):
    list_display = ["location_service_provide", "address"]


class Services(admin.ModelAdmin):
    list_display = ["user", "name", "category"]


admin.site.register(ServiceProvider, Services)
admin.site.register(Category)
admin.site.register(Review, ReviewAdmin)
admin.site.register(MeetingInformation)
admin.site.register(Appointment, Appointments)
admin.site.register(Location, Locations)
