from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from .models import IncidentReport, TimelineEvent
from .serializers import IncidentReportSerializer, IncidentCreateSerializer
from django.shortcuts import get_object_or_404

class IncidentReportViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = IncidentReport.objects.all()
    lookup_field = 'claim_token'
    
    def get_serializer_class(self):
        if self.action == 'create':
            return IncidentCreateSerializer
        return IncidentReportSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        incident = serializer.save()
        
        # Auto-create the first timeline event
        TimelineEvent.objects.create(
            incident=incident,
            title="Case Received & Hash Verified",
            description="Your report has been securely received by our system."
        )
        
        # Return the full representation including the claim token
        response_serializer = IncidentReportSerializer(incident)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
