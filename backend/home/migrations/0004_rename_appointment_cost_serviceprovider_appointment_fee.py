# Generated by Django 3.2.15 on 2022-11-24 07:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_auto_20221124_0623'),
    ]

    operations = [
        migrations.RenameField(
            model_name='serviceprovider',
            old_name='appointment_cost',
            new_name='appointment_fee',
        ),
    ]
