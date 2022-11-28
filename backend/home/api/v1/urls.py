from dj_rest_auth.registration.views import RegisterView
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from home.api.v1.viewsets import *
from home.views import *

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("meeting-info", MeetingInfoView, basename="meeting_info")
router.register("category", CategoryView, basename="category")
router.register("client", CreateClientView, basename="category")
router.register("srvc_prvdr", CreateServiceProviderView, basename="service_provider")
router.register("location", CreateLocationView, basename="location")
router.register("review", ClientReviewView, basename="review")
router.register("appointment", AppointmentView, basename="appointment")


urlpatterns = [
    path("", include(router.urls)),
]
