from django.urls import path

from .views import *

urlpatterns = [
    path("", home, name="home"),
    path('category/', CategoryView.as_view()),
    path('srvc_prvdr/', CreateServiceProviderView.as_view()),
    path('location/', CreateLocationView.as_view()),
    path('client/', CreateClientView.as_view()),
    path('review/', ClientReviewView.as_view()),
    path('appointment/', AppointmentView.as_view()),
    path('meeting-info/', MeetingInfoView.as_view()),

]
