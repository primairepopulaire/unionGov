from rest_framework import serializers

from .models import Candidate, Config, ConfigRef, Position, User


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ('id', 'first_name', 'last_name', 'image_url')


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('id', 'position_name')


class ConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = Config
        fields = ('id', 'config_ref', 'position', 'candidate')


class RichConfigSerializer(serializers.ModelSerializer):
    position = PositionSerializer(read_only=True)
    candidate = CandidateSerializer(read_only=True)

    class Meta:
        model = Config
        fields = ('id', 'config_ref', 'position', 'candidate')


class ConfigRefSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfigRef
        fields = ('id', 'config_ref', 'save_date', 'user')

class SConfigRefSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfigRef
        fields = ('config_ref',)

class XConfigSerializer(serializers.ModelSerializer):
    config_ref = SConfigRefSerializer(read_only=True)
    class Meta:
        model = Config
        fields = ('id', 'config_ref', 'position', 'candidate')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email_address', 'first_name', 'last_name')
