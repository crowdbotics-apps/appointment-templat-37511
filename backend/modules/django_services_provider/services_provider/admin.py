from django.contrib import admin
from .models import *
# Register your models here.


class ReviewAdmin(admin.ModelAdmin):
    list_display = ["to_service_provider", "from_client", "rating"]


class Locations(admin.ModelAdmin):
    list_display = ["location_service_provide", "address"]


class Services(admin.ModelAdmin):
    list_display = ["user", "name", "category"]


admin.site.register(ServiceProvider, Services)
admin.site.register(Category)
admin.site.register(Review, ReviewAdmin)
admin.site.register(MeetingInformation)
admin.site.register(Location, Locations)
