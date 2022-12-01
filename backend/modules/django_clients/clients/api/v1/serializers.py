from rest_framework import serializers

from modules.django_clients.clients.models import Clients
from modules.django_services_provider.services_provider.models import Review


class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Clients
        fields = '__all__'
        extra_kwargs = {'image': {'required': False}, 'user': {'required': False}}

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data.update({'user': request.user})
        return super(ClientSerializer, self).create(validated_data)


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = '__all__'