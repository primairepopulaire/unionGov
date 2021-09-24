from django.shortcuts import render, get_object_or_404
from django.views.generic.list import ListView

from rest_framework import viewsets
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend

from .models import Candidate, Config, ConfigRef, Position, User
from .serializers import CandidateSerializer, ConfigSerializer, ConfigRefSerializer 
from .serializers import PositionSerializer, UserSerializer, RichConfigSerializer


class CandidateAPIView(viewsets.ModelViewSet):
    serializer_class = CandidateSerializer
    queryset = Candidate.objects.all()


class ConfigAPIView(viewsets.ModelViewSet):
    queryset = Config.objects.all()
    serializer_class = ConfigSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['config_ref']

    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]

            if isinstance(data, list):
                kwargs["many"] = True
        return super(ConfigAPIView, self).get_serializer(*args, **kwargs)


class RichConfigAPIView(viewsets.ModelViewSet):
    queryset = Config.objects.all()
    serializer_class = RichConfigSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['config_ref']


class ConfigRefAPIView(viewsets.ModelViewSet):
    serializer_class = ConfigRefSerializer
    queryset = ConfigRef.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['config_ref']


class PositionAPIView(viewsets.ModelViewSet):
    serializer_class = PositionSerializer
    queryset = Position.objects.all().order_by('id')


class UserAPIView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class PositionListView(ListView):
    model = Position
    paginate_by = 20

    def get_context_data(self, **kwargs):
        return super().get_context_data(**kwargs)


class CandidateListView(ListView):
    model = Candidate
    paginate_by = 20

    def get_context_data(self, **kwargs):
        return super().get_context_data(**kwargs)


def candidate(request, candidate_id):
    candidate = get_object_or_404(Candidate, pk=candidate_id)
    return render(request, 'gov/candidate.html', {'candidate': candidate})
