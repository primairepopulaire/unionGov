from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.views.generic.list import ListView

from rest_framework import viewsets

from .models import Candidate, Config, ConfigRef, Position, User
from .serializers import CandidateSerializer, ConfigSerializer, ConfigRefSerializer 
from .serializers import PositionSerializer, UserSerializer


class CandidateAPIView(viewsets.ModelViewSet):
    serializer_class = CandidateSerializer
    queryset = Candidate.objects.all()

class ConfigAPIView(viewsets.ModelViewSet):
    serializer_class = ConfigSerializer
    queryset = Config.objects.all()

class ConfigRefAPIView(viewsets.ModelViewSet):
    serializer_class = ConfigRefSerializer
    queryset = ConfigRef.objects.all()

class PositionAPIView(viewsets.ModelViewSet):
    serializer_class = PositionSerializer
    queryset = Position.objects.all()

class UserAPIView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class PositionListView(ListView):
    model = Position
    paginate_by = 20

from .models import Candidate, Position
from .serializers import CandidateSerializer, PositionSerializer

class PositionListView(viewsets.ModelViewSet):
    serializer_class = PositionSerializer
    queryset = Position.objects.all()

class CandidateListView(viewsets.ModelViewSet):
    serializer_class = CandidateSerializer
    queryset = Candidate.objects.all()


def candidate(request, candidate_id):
    candidate = get_object_or_404(Candidate, pk=candidate_id)
    return render(request, 'gov/candidate.html', {'candidate': candidate})
