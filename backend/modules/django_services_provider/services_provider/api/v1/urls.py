from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import *

router = DefaultRouter()
router.register("meeting-info", MeetingInfoView, basename="meeting_info")
router.register("category", CategoryView, basename="category")
router.register("srvc_prvdr", CreateServiceProviderView, basename="service_provider")
router.register("location", CreateLocationView, basename="location")
router.register("appointment", AppointmentView, basename="appointment")


urlpatterns = [
    path("", include(router.urls)),
]
