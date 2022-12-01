from rest_framework import serializers

from modules.django_clients.clients.api.v1.serializers import ReviewSerializer
from modules.django_services_provider.services_provider.models import Category, Location, ServiceProvider, MeetingInformation


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class LocationSerializer(serializers.ModelSerializer):
    service_location = serializers.CharField(source='location_service_provide', read_only=True)

    class Meta:
        model = Location
        fields = '__all__'

    def create(self, validated_data):
        return super(LocationSerializer, self).create(validated_data)


class ServiceProviderSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.title', read_only=True)
    review_service_prov = ReviewSerializer(read_only=True, many=True)
    locations = LocationSerializer(read_only=True, many=True)

    class Meta:
        model = ServiceProvider
        fields = '__all__'
        extra_kwargs = {'image': {'required': False}, 'user': {'required': False}}

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data.update({'user': request.user})
        return super(ServiceProviderSerializer, self).create(validated_data)


class MeetingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingInformation
        fields = '__all__'

