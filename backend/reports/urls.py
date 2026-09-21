from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IncidentReportViewSet, AdminIncidentViewSet, AdminTimelineViewSet, AdminResponderOrgViewSet

router = DefaultRouter()
router.register(r'incidents', IncidentReportViewSet, basename='incident')
router.register(r'admin/incidents', AdminIncidentViewSet, basename='admin-incident')
router.register(r'admin/timeline', AdminTimelineViewSet, basename='admin-timeline')
router.register(r'admin/responders', AdminResponderOrgViewSet, basename='admin-responder')

urlpatterns = [
    path('', include(router.urls)),
]

