from django.db import migrations

def seed_responders(apps, schema_editor):
    ResponderOrg = apps.get_model('reports', 'ResponderOrg')
    orgs = [
        {
            "name": "Addis Ababa Bureau of Women & Social Affairs",
            "tier": "Social Support",
            "jurisdiction": "Addis Ababa",
            "country": "Ethiopia",
            "contact": "Local Hotline"
        },
        {
            "name": "EWLA Legal Aid Clinic",
            "tier": "Legal Defense",
            "jurisdiction": "Federal",
            "country": "Ethiopia",
            "contact": "contact@ewla.org"
        },
        {
            "name": "Safe Haven Emergency Shelter",
            "tier": "Emergency Shelter",
            "jurisdiction": "Addis Ababa",
            "country": "Ethiopia",
            "contact": "0911-00-00-00"
        }
    ]
    for org_data in orgs:
        ResponderOrg.objects.get_or_create(name=org_data["name"], defaults=org_data)

def reverse_seed(apps, schema_editor):
    ResponderOrg = apps.get_model('reports', 'ResponderOrg')
    ResponderOrg.objects.filter(name__in=[
        "Addis Ababa Bureau of Women & Social Affairs",
        "EWLA Legal Aid Clinic",
        "Safe Haven Emergency Shelter"
    ]).delete()

class Migration(migrations.Migration):

    dependencies = [
        ('reports', '0003_responderorg'),
    ]

    operations = [
        migrations.RunPython(seed_responders, reverse_seed),
    ]
