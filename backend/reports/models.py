import hashlib
from django.db import models
import uuid

def generate_claim_token():
    # Example format: WAS-7821-KM
    import secrets
    prefix = "WAS"
    num = secrets.randbelow(9000) + 1000
    suffix = secrets.token_hex(2).upper()
    return f"{prefix}-{num}-{suffix}"

class IncidentReport(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending Initial Review'
        TRIAGED = 'TRIAGED', 'Case Verified & Triaged'
        ASSIGNED = 'ASSIGNED', 'Assigned to Support Organization'
        ACTION_IN_PROGRESS = 'ACTION_IN_PROGRESS', 'Protective Action in Progress'
        RESOLVED = 'RESOLVED', 'Case Resolution / Protective Action Completed'

    class Category(models.TextChoices):
        SEXUAL_VIOLENCE = 'SEXUAL_VIOLENCE', 'Sexual Violence & Rape'
        DOMESTIC_ABUSE = 'DOMESTIC_ABUSE', 'Domestic / Intimate Partner Violence'
        PHYSICAL_ASSAULT = 'PHYSICAL_ASSAULT', 'Physical Assault & Battery'
        HARASSMENT_STALKING = 'HARASSMENT_STALKING', 'Harassment & Stalking'
        CHILD_EARLY_MARRIAGE = 'CHILD_EARLY_MARRIAGE', 'Harmful Practices & Child Exploitation'
        OTHER = 'OTHER', 'Other Unspecified Abuse'

    class Urgency(models.TextChoices):
        LOW = 'LOW', 'Low'
        MEDIUM = 'MEDIUM', 'Standard'
        HIGH = 'HIGH', 'High Priority'
        CRITICAL = 'CRITICAL', 'Immediate Threat / Medical Emergency'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Security: Hashed token stored in DB.
    # Raw token is returned only once to survivor on creation.
    token_hash = models.CharField(max_length=64, unique=True, db_index=True)

    # Core classification
    category = models.CharField(max_length=50, choices=Category.choices)
    urgency = models.CharField(max_length=20, choices=Urgency.choices, default=Urgency.MEDIUM)
    description = models.TextField(help_text="Narrative of the incident (scrubbed of direct PII)")
    
    # Coarse Geographic Scoping (Privacy-Preserving)
    country = models.CharField(max_length=100, default='Ethiopia')
    region_state = models.CharField(max_length=100, help_text="e.g., Addis Ababa, Oromia")
    city_district = models.CharField(max_length=100, help_text="e.g., Bole Sub-City, Woreda 03", null = True)
    approximate_location = models.CharField(
        max_length=255, 
        blank=True, 
        null=True, 
        help_text="Optional general landmark or neighborhood (no specific home addresses)"
    )

    # Workflow status
    status = models.CharField(max_length=30, choices=Status.choices, default=Status.PENDING)
    
    # Audit timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.category} ({self.status}) - {self.city_district}, {self.region_state}"

    @classmethod
    def hash_token(cls, raw_token: str) -> str:
        return hashlib.sha256(raw_token.strip().upper().encode('utf-8')).hexdigest()

class TimelineEvent(models.Model):
    incident = models.ForeignKey(IncidentReport, on_delete=models.CASCADE, related_name='timeline')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.incident.id} - {self.title}"

