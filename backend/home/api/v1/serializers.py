from django.contrib.auth import get_user_model, authenticate
from django.http import HttpRequest, HttpResponse
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_auth.serializers import PasswordResetSerializer

from home.models import *

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'user_type', 'name', 'email', 'password')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'email': {
                'required': True,
                'allow_blank': False,
            },
            'user_type': {
                'required': True,
                'allow_blank': False,
            }
        }

    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def create(self, validated_data):
        user = User(
            user_type=validated_data.get('user_type'),
            email=validated_data.get('email'),
            name=validated_data.get('name'),
            username=generate_unique_username([
                validated_data.get('name'),
                validated_data.get('email'),
                validated_data.get('user_type'),
                'user'
            ])
        )
        user.set_password(validated_data.get('password'))
        user.save()
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self):
        """rest_auth passes request so we must override to accept it"""
        return super().save()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'user_type']


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""
    password_reset_form_class = ResetPasswordForm


class CategorySerializer(serializers.ModelSerializer):
    profession_name = serializers.CharField(source='profession.profession_category', read_only=True)

    class Meta:
        model = Category
        fields = ['profession_name', 'title', 'description']
        xtra_kwargs = {'image': {'required': False}}


class AppointmentSerializer(serializers.ModelSerializer):
    client_detail = serializers.CharField(source='clients', read_only=True)
    servicer_detail = serializers.CharField(source='service_provider', read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'

    def validate(self, data):
        if not self.instance:
            if Appointment.objects.filter(
                                          start_time=data['start_time'],
                                          end_time=data['end_time']).exists():
                raise serializers.ValidationError(f'Appointment Already Booked for {data["service_provider"]}')
            return data


class ServiceProviderSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.title', read_only=True)
    client = AppointmentSerializer(many=True, read_only=True)
    reviews = serializers.CharField(source='to_service_provider', read_only=True)

    class Meta:
        model = ServiceProvider
        fields = ['name', 'uuid', 'gender', 'speciality', 'biography', 'experience', 'opening_time', 'closing_time', 'available_days',  'image', 'category', 'category_name', 'client', 'reviews', 'appointment_cost']
        extra_kwargs = {'image': {'required': False}}

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data.update({'user': request.user})
        return super(ServiceProviderSerializer, self).create(validated_data)


class ClientPatientSerializer(serializers.ModelSerializer):
    service_provider = AppointmentSerializer(many=True, read_only=True)

    class Meta:
        model = Clients
        fields = '__all__'
        extra_kwargs = {'image': {'required': False}, 'user': {'required': False}}

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data.update({'user': request.user})
        return super(ClientPatientSerializer, self).create(validated_data)


class ReviewSerializer(serializers.ModelSerializer):
    client_detail = serializers.CharField(source='from_client', read_only=True)
    service_provider_detail = serializers.CharField(source='to_service_provider', read_only=True)

    class Meta:
        model = Review
        fields = ['to_service_provider', 'from_client', 'comment', 'rating', 'client_detail', 'service_provider_detail']

    def create(self, validated_data):
        return super(ReviewSerializer, self).create(validated_data)


class MeetingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingInformation
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data.update({'user': request.user})
        return super(MeetingInfoSerializer, self).create(validated_data)


class LocationSerializer(serializers.ModelSerializer):
    service_location = serializers.CharField(source='location_service_provide', read_only=True)

    class Meta:
        model = Location
        fields = '__all__'

