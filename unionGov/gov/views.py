from django.shortcuts import get_object_or_404, render
from django.views.generic.list import ListView

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Candidate, Config, Government, Position, User, get_new_ref
from .serializers import (CandidateSerializer, GovernmentSerializer,
                          ConfigSerializer, PositionSerializer,
                          RichConfigSerializer, UserSerializer,
                          XConfigSerializer)
from django.core.exceptions import ValidationError

#To understand how ViewSets work :
#@docs : https://www.django-rest-framework.org/api-guide/viewsets/

class CandidateAPIView(viewsets.ReadOnlyModelViewSet):
    serializer_class = CandidateSerializer
    queryset = Candidate.objects.all()

class ConfigAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = Config.objects.all()
    serializer_class = ConfigSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['government__reference']


    def list(self, request, *args, **kwargs):
        ref_query = request.query_params.get('reference')
        enrich = request.query_params.get('enrich')

        if ref_query is not None:
            queryset = self.queryset.filter(government__reference=ref_query)
            if enrich is not None:
                if enrich.lower() == 'true' :
                    serializer =  RichConfigSerializer(queryset, many=True)
                else:
                    serializer = self.serializer_class(queryset, many=True)
            else:
                serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


#class RichConfigAPIView(viewsets.ModelViewSet):
#    queryset = Config.objects.all()
#    serializer_class = RichConfigSerializer
#    filter_backends = [DjangoFilterBackend]
#    filterset_fields = ['config_ref']

#TODO: this does not filter anything. Providing any value to config_ref returns all
#class XConfigAPIView(viewsets.ModelViewSet):
#    def get_queryset(self):
#        """
#        Optionally restricts the returned configs to a given Government,
#        by filtering against a `config_ref` 32 chars string in the URL query.
#        """
#        queryset = Config.objects.all()
#        ref_query = self.request.query_params.get('config_ref')
#        if ref_query is not None:
#            queryset = queryset.filter(config_ref__config_ref=ref_query)
#        return queryset
#    #queryset = Config.objects.all()
#    serializer_class = XConfigSerializer
#    filter_backends = [DjangoFilterBackend]
#    #filter_fields = ['config_ref__config_ref']


class GovernmentAPIView(viewsets.ModelViewSet):
    serializer_class = GovernmentSerializer
    queryset = Government.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['reference']
    http_method_names = ['get', 'post']

    def isValidList(self,postListOfConfigs):
        #list all configs and check rules
        listOfCheckedPositionIDs = []
        listOfCheckedCandidateIDs = []

        listOfRegisteredPositionIDs = Position.objects.values_list('pk', flat=True)#check against database
        listOfRegisteredCandidateIDs = Candidate.objects.values_list('pk', flat=True)

        nbOfPositions = len(listOfRegisteredPositionIDs)

        presidentPosition = Position.objects.get(slug='president')

        if len(postListOfConfigs) < nbOfPositions:
            raise ValidationError("Some positions have not been fulfilled")
        for config in postListOfConfigs:
            if config['position'] in listOfCheckedPositionIDs:
                raise ValidationError("A position has been set up two times")
            if config['candidate'] in listOfCheckedCandidateIDs:
                raise ValidationError("A candidate has been selected for two different positions")

            if not config['position'] in listOfRegisteredPositionIDs:
                raise ValidationError("A position ID (" + str(config['position']) + ") does not match any position in DB")

            if not config['candidate'] in listOfRegisteredCandidateIDs:
                raise ValidationError("A candidate ID (" + str(config['candidate']) + ") does not match any candidate in DB")

            if config['position'] == presidentPosition.id:
                candidate = Candidate.objects.get(pk=config['candidate'])

                if not candidate.running:
                    raise ValidationError(candidate.last_name + " cannot be chosen as president")

            listOfCheckedPositionIDs.append(config['position'])
            listOfCheckedCandidateIDs.append(config['candidate'])
        return True

    def create(self, request):
        newGovernment = Government.objects.create(reference=get_new_ref())
        newGovernment.save()
        serializedGovernment = self.serializer_class(newGovernment)

        #TODO: find government with the exact same config list

        try:
            self.isValidList(request.data)
            for requestConfig in request.data:
                newConfig = Config.objects.create(position_id=requestConfig['position'] , candidate_id=requestConfig['candidate'] , government=newGovernment)
                newConfig.save()
            return Response(serializedGovernment.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            newGovernment.delete()
            return Response(e.messages, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True)
    def enrich(self, request, pk=None):
        if pk is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        government = get_object_or_404(Government, pk=pk)
        serializedGovernment = self.serializer_class(government)

        configs = Config.objects.filter(government__pk=pk)
        serializedConfigs = RichConfigSerializer(configs, many=True)

        newDict = {}
        newDict.update(serializedGovernment.data)
        newDict['configs'] = serializedConfigs.data
        return Response(newDict, status=status.HTTP_200_OK)



class PositionAPIView(viewsets.ReadOnlyModelViewSet):
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
