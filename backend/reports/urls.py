from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IncidentReportViewSet, AdminIncidentViewSet, AdminTimelineViewSet

router = DefaultRouter()
router.register(r'incidents', IncidentReportViewSet, basename='incident')
router.register(r'admin/incidents', AdminIncidentViewSet, basename='admin-incident')
router.register(r'admin/timeline', AdminTimelineViewSet, basename='admin-timeline')

urlpatterns = [
    path('', include(router.urls)),
]

