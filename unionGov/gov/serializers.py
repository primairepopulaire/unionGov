from rest_framework import serializers

from .models import Candidate, Config, Government, Position, User


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ('id', 'first_name', 'last_name', 'image_url','running')


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('id', 'position_name','slug')


class ConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = Config
        fields = ('id', 'government', 'position', 'candidate')


class RichConfigSerializer(serializers.ModelSerializer):
    position = PositionSerializer(read_only=True)
    candidate = CandidateSerializer(read_only=True)

    class Meta:
        model = Config
        fields = ('id', 'government', 'position', 'candidate')


class GovernmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Government
        fields = ('id', 'reference', 'save_date', 'user')

class SGovernmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Government
        fields = ('reference',)

class XConfigSerializer(serializers.ModelSerializer):
    government = SGovernmentSerializer(read_only=True)
    class Meta:
        model = Config
        fields = ('id', 'government', 'position', 'candidate')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email_address', 'first_name', 'last_name')
