# Generated by Django 3.2.15 on 2022-11-21 11:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('home', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='serviceprovider',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='service_provider_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='review',
            name='from_client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client_patient', to='home.clients'),
        ),
        migrations.AddField(
            model_name='review',
            name='to_service_provider',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='review_service_prov', to='home.serviceprovider'),
        ),
        migrations.AddField(
            model_name='meetinginformation',
            name='service_provider',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='service_provider_fee_info', to='home.serviceprovider'),
        ),
        migrations.AddField(
            model_name='location',
            name='location_service_provide',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='locations', to='home.serviceprovider'),
        ),
        migrations.AddField(
            model_name='clients',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='appointment',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointment_client', to='home.clients'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='service_provider',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointment_service_provider', to='home.serviceprovider'),
        ),
    ]
