from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse

from .models import Candidate


def index(request):
    candidate_list = Candidate.objects.all()
    return render(request, 'gov/index.html', {'candidate_list': candidate_list})

def candidate(request, candidate_id):
    candidate = get_object_or_404(Candidate, pk=candidate_id)
    return render(request, 'gov/candidate.html', {'candidate': candidate})
