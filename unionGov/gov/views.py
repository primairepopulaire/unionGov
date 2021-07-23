from django.shortcuts import render
from django.http import HttpResponse

from .models import Candidate


def index(request):
    candidate_list = Candidate.objects.all()
    context = {
        'candidate_list': candidate_list,
    }
    return render(request, 'gov/index.html', context)
