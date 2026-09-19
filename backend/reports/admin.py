from django.contrib import admin
from .models import IncidentReport, TimelineEvent

class TimelineEventInline(admin.TabularInline):
    model = TimelineEvent
    extra = 1
    readonly_fields = ('timestamp',)

@admin.register(IncidentReport)
class IncidentReportAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'urgency', 'status', 'city_district', 'region_state', 'created_at')
    list_filter = ('status', 'urgency', 'category', 'region_state')
    search_fields = ('id', 'city_district', 'region_state', 'description')
    readonly_fields = ('id', 'token_hash', 'created_at', 'updated_at')
    inlines = [TimelineEventInline]
    
    fieldsets = (
        ('System Information', {
            'fields': ('id', 'token_hash', 'created_at', 'updated_at')
        }),
        ('Incident Details', {
            'fields': ('category', 'urgency', 'description', 'status')
        }),
        ('Location Data (Approximate)', {
            'fields': ('country', 'region_state', 'city_district', 'approximate_location')
        }),
    )

@admin.register(TimelineEvent)
class TimelineEventAdmin(admin.ModelAdmin):
    list_display = ('title', 'incident', 'timestamp')
    search_fields = ('title', 'description', 'incident__id')
