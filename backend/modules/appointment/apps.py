from django.apps import AppConfig


class AppointmentLocalConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'modules.appointment'
    verbose_name = "Appointment"


