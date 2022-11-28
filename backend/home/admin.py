from django.contrib import admin
from .models import *

# Register your models here.


class ReviewAdmin(admin.ModelAdmin):
    list_display = ['from_client', "to_service_provider"]


admin.site.register(Category)
admin.site.register(ServiceProvider)
admin.site.register(Location)
admin.site.register(Clients)
admin.site.register(Review,ReviewAdmin)
admin.site.register(Appointment)
admin.site.register(MeetingInformation)



