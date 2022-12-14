# Generated by Django 3.2.15 on 2022-11-25 16:34

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_remove_serviceprovider_speciality'),
    ]

    operations = [
        migrations.AlterField(
            model_name='serviceprovider',
            name='available_days',
            field=multiselectfield.db.fields.MultiSelectField(choices=[('Mon', 'Monday'), ('Tue', 'Tuesday'), ('Wed', 'Wednesday'), ('Thu', 'Thursday'), ('Fri', 'Friday'), ('Sat', 'Saturday'), ('Sun', 'Sunday')], max_length=27),
        ),
    ]
