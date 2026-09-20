from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from .models import IncidentReport, TimelineEvent, generate_claim_token
from .serializers import IncidentReportSerializer, IncidentCreateSerializer, AdminTimelineEventCreateSerializer, AdminIncidentSerializer
from django.shortcuts import get_object_or_404

class IncidentReportViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = IncidentReport.objects.all()
    lookup_field = 'token' # The URL will pass the raw token here
    
    def get_serializer_class(self):
        if self.action == 'create':
            return IncidentCreateSerializer
        return IncidentReportSerializer

    def get_object(self):
        # The user passes the RAW token in the URL (e.g. /api/incidents/WAS-1234-AB/)
        raw_token = self.kwargs.get(self.lookup_field)
        hashed = IncidentReport.hash_token(raw_token)
        return get_object_or_404(IncidentReport, token_hash=hashed)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # 1. Generate raw token and hash it
        raw_token = generate_claim_token()
        hashed = IncidentReport.hash_token(raw_token)
        
        # 2. Save incident with the hashed token
        incident = serializer.save(token_hash=hashed)
        
        # 3. Auto-create the first timeline event
        TimelineEvent.objects.create(
            incident=incident,
            title="Case Received & Hash Verified",
            description="Your report has been securely received. This timeline will update as action is taken."
        )
        
        # 4. Attach the raw token dynamically JUST for this response so the user can see it once
        incident.raw_token = raw_token
        
        # Return the full representation including the raw token
        response_serializer = IncidentReportSerializer(incident)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)


from rest_framework.permissions import IsAdminUser

class AdminIncidentViewSet(viewsets.ModelViewSet):
    queryset = IncidentReport.objects.all()
    serializer_class = AdminIncidentSerializer
    permission_classes = [IsAdminUser]

class AdminTimelineViewSet(viewsets.ModelViewSet):
    queryset = TimelineEvent.objects.all()
    serializer_class = AdminTimelineEventCreateSerializer
    permission_classes = [IsAdminUser]
