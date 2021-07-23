from django.urls import path

from . import views
from gov.views import PositionListView, CandidateListView

urlpatterns = [
    #path('', PositionListView.as_view(), name='index'),
    #path('perso/', CandidateListView.as_view(), name='persos'), 
    #path('perso/<int:candidate_id>/', views.candidate, name='detail'),
]
