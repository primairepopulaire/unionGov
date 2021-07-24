from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.views.generic.list import ListView

from rest_framework import viewsets

from .models import Candidate, Position
from .serializers import CandidateSerializer, PositionSerializer


class PositionAPIView(viewsets.ModelViewSet):
    serializer_class = PositionSerializer
    queryset = Position.objects.all()

class CandidateAPIView(viewsets.ModelViewSet):
    serializer_class = CandidateSerializer
    queryset = Candidate.objects.all()

    def get_context_data(self, **kwargs):
        return super().get_context_data(**kwargs)

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

"""
def index(request):
    position_list = Position.objects.all()
    return render(request, 'gov/position_list.html', {'position_list': position_list})

def index(request):
    candidate_list = Candidate.objects.all()
    return render(request, 'gov/index.html', {'candidate_list': candidate_list})
"""


def candidate(request, candidate_id):
    candidate = get_object_or_404(Candidate, pk=candidate_id)
    return render(request, 'gov/candidate.html', {'candidate': candidate})
