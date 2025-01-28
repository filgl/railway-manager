# Generated by Django 5.1.4 on 2025-01-28 13:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Station',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256, unique=True)),
                ('city', models.CharField(max_length=256)),
                ('platforms', models.IntegerField()),
                ('opening_year', models.IntegerField(blank=True, null=True)),
                ('main_station', models.BooleanField(default=True)),
                ('actual_state', models.CharField(choices=[('in_use', 'In Use'), ('abandoned', 'Abandoned'), ('not_in_use', 'Not In Use'), ('under_maintenance', 'Under Maintenance')], default='in_use')),
            ],
        ),
        migrations.CreateModel(
            name='TrainModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256, unique=True)),
                ('type', models.CharField(choices=[('regional', 'Regional'), ('high_speed', 'High Speed'), ('intercity', 'Intercity'), ('freight', 'Freight')], default='regional')),
                ('nickname', models.CharField(blank=True, max_length=256, null=True, unique=True)),
                ('max_speed', models.IntegerField()),
                ('seats', models.IntegerField(blank=True, null=True)),
                ('length', models.FloatField()),
                ('width', models.FloatField()),
                ('height', models.FloatField()),
                ('gauge', models.IntegerField()),
                ('weight', models.IntegerField()),
                ('power_output', models.IntegerField()),
                ('power_system', models.CharField(choices=[('electric', 'Electric'), ('diesel', 'Diesel'), ('hydrogen', 'Hydrogen'), ('hybrid', 'Hybrid')], default='electric')),
            ],
        ),
        migrations.CreateModel(
            name='Route',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nickname', models.CharField(blank=True, max_length=256, null=True, unique=True)),
                ('length', models.FloatField()),
                ('max_speed', models.IntegerField()),
                ('type', models.CharField(choices=[('mixed', 'Mixed'), ('high_speed', 'High Speed'), ('regional', 'Regional'), ('intercity', 'Intercity'), ('freight', 'Freight')], default='mixed')),
                ('actual_state', models.CharField(choices=[('in_use', 'In Use'), ('abandoned', 'Abandoned'), ('not_in_use', 'Not In Use'), ('under_maintenance', 'Under Maintenance')], default='in_use')),
                ('opening_year', models.IntegerField(blank=True, null=True)),
                ('latest_maintenance', models.DateField(blank=True, null=True)),
                ('gauge', models.IntegerField()),
                ('electrified', models.CharField(choices=[('electrified', 'Electrified'), ('not_electrified', 'Not Electrified'), ('electrification_in_progress', 'Electrification In Progress'), ('partially', 'Partially')], default='electrified')),
                ('electrification_voltage', models.IntegerField(blank=True, null=True)),
                ('end_station', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='end_routes', to='railway_assets.station')),
                ('start_station', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='start_routes', to='railway_assets.station')),
            ],
        ),
        migrations.CreateModel(
            name='Train',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nickname', models.CharField(blank=True, max_length=256, null=True, unique=True)),
                ('number', models.IntegerField()),
                ('actual_state', models.CharField(choices=[('in_use', 'In Use'), ('abandoned', 'Abandoned'), ('not_in_use', 'Not In Use'), ('under_maintenance', 'Under Maintenance')], default='in_use')),
                ('construction_year', models.IntegerField()),
                ('year_entered_service', models.IntegerField()),
                ('kilometers_run', models.IntegerField()),
                ('latest_inspection', models.DateField(blank=True, null=True)),
                ('operator', models.CharField(max_length=256)),
                ('associated_route', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='trains', to='railway_assets.route')),
                ('model', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='trains', to='railway_assets.trainmodel')),
            ],
        ),
    ]
