from rest_framework import serializers
from .models import IncidentReport, TimelineEvent

class TimelineEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimelineEvent
        fields = ['title', 'description', 'timestamp']

class IncidentReportSerializer(serializers.ModelSerializer):
    timeline = TimelineEventSerializer(many=True, read_only=True)
    raw_token = serializers.CharField(read_only=True, required=False)

    class Meta:
        model = IncidentReport
        fields = [
            'id', 'category', 'urgency', 'description', 
            'country', 'region_state', 'city_district', 'approximate_location',
            'status', 'created_at', 'updated_at', 'timeline', 'raw_token'
        ]
        read_only_fields = ['id', 'status', 'created_at', 'updated_at', 'timeline']

class IncidentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentReport
        fields = [
            'category', 'urgency', 'description', 
            'country', 'region_state', 'city_district', 'approximate_location'
        ]


class AdminTimelineEventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimelineEvent
        fields = ['incident', 'title', 'description']

class AdminIncidentSerializer(serializers.ModelSerializer):
    timeline = TimelineEventSerializer(many=True, read_only=True)

    class Meta:
        model = IncidentReport
        fields = [
            'id', 'category', 'urgency', 'description', 
            'country', 'region_state', 'city_district', 'approximate_location',
            'status', 'created_at', 'updated_at', 'timeline'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'timeline']

from .models import ResponderOrg

class ResponderOrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponderOrg
        fields = '__all__'
