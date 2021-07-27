from rest_framework import serializers
from .models import Candidate, Config, ConfigRef, Position, User

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ('id', 'first_name', 'last_name', 'image_url')

class ConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = Config
        fields = ('id', 'config_ref', 'position', 'candidate')

class ConfigRefSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfigRef
        fields = ('id', 'config_ref', 'save_date', 'user')


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('id', 'position_name')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email_address', 'first_name', 'last_name')
