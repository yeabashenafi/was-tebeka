import random
import string
from django.db import models

def generate_claim_token():
    # e.g., WAS-8492-KM
    num = ''.join(random.choices(string.digits, k=4))
    letters = ''.join(random.choices(string.ascii_uppercase, k=2))
    return f"WAS-{num}-{letters}"

class IncidentReport(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('TRIAGE', 'Case Received & Hash Verified'),
        ('ASSIGNED', 'Assigned to Legal Aid Clinic'),
        ('ACTION', 'Emergency Shelter Referral Dispatched'),
        ('RESOLVED', 'Case Resolution / Legal Action')
    ]

    claim_token = models.CharField(
        max_length=20, 
        unique=True, 
        default=generate_claim_token, 
        editable=False,
        primary_key=True
    )
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.claim_token} - {self.status}"

class TimelineEvent(models.Model):
    incident = models.ForeignKey(IncidentReport, on_delete=models.CASCADE, related_name='timeline')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.incident.claim_token} - {self.title}"
