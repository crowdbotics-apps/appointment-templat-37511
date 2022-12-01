
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from modules.django_clients.clients.api.v1.viewsets import CreateClientView, ClientReviewView


router = DefaultRouter()
router.register("clients", CreateClientView, basename="category")
router.register("review", ClientReviewView, basename="review")


urlpatterns = [
    path("", include(router.urls)),
]
