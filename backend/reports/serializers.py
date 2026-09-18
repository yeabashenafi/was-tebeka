from rest_framework import serializers
from .models import IncidentReport, TimelineEvent

class TimelineEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimelineEvent
        fields = ['title', 'description', 'timestamp']

class IncidentReportSerializer(serializers.ModelSerializer):
    timeline = TimelineEventSerializer(many=True, read_only=True)

    class Meta:
        model = IncidentReport
        fields = ['claim_token', 'description', 'status', 'created_at', 'updated_at', 'timeline']
        read_only_fields = ['claim_token', 'status', 'created_at', 'updated_at', 'timeline']

class IncidentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentReport
        fields = ['description']
