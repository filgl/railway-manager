from django.db import models
from django.db.models import (
    BooleanField,
    CharField,
    DateField,
    FloatField,
    ForeignKey,
    IntegerField,
)

STATE_CHOICES = (
    ("in_use", "In Use"),
    ("abandoned", "Abandoned"),
    ("not_in_use", "Not In Use"),
    ("under_maintenance", "Under Maintenance"),
)

TRAIN_MODEL_CHOICES = (
    ("regional", "Regional"),
    ("high_speed", "High Speed"),
    ("intercity", "Intercity"),
    ("freight", "Freight"),
)

POWER_SYSTEM_CHOICES = (
    ("electric", "Electric"),
    ("diesel", "Diesel"),
    ("hydrogen", "Hydrogen"),
    ("hybrid", "Hybrid"),
)

ROUTE_TYPE_CHOICES = (
    ("mixed", "Mixed"),
    ("high_speed", "High Speed"),
    ("regional", "Regional"),
    ("intercity", "Intercity"),
    ("freight", "Freight"),
)

ELECTRIFICATION_CHOICES = (
    ("electrified", "Electrified"),
    ("not_electrified", "Not Electrified"),
    ("electrification_in_progress", "Electrification In Progress"),
    ("partially", "Partially"),
)

COMPOSITION_CHOICES = (
    ("multiple_unit", "Multiple Unit"),
    ("locomotive", "Locomotive"),
)


class Station(models.Model):
    """
    This class represents the Station model.
    """

    name: CharField = models.CharField(max_length=256, unique=True)
    city: CharField = models.CharField(max_length=256)
    platforms: IntegerField = models.IntegerField()
    opening_year: IntegerField = models.IntegerField(blank=True, null=True)
    main_station: BooleanField = models.BooleanField(default=True)
    actual_state: CharField = models.CharField(
        choices=STATE_CHOICES, default=STATE_CHOICES[0][0]
    )

    def __str__(self):
        return f"{self.name} ({self.city})"


class Route(models.Model):
    """
    This class represents the Route model.
    """

    start_station: ForeignKey = models.ForeignKey(
        Station, on_delete=models.PROTECT, related_name="start_routes"
    )
    end_station: ForeignKey = models.ForeignKey(
        Station, on_delete=models.PROTECT, related_name="end_routes"
    )
    nickname: CharField = models.CharField(
        max_length=256, unique=True, blank=True, null=True
    )
    length: FloatField = models.FloatField()
    max_speed: IntegerField = models.IntegerField()
    type: CharField = models.CharField(
        choices=ROUTE_TYPE_CHOICES, default=ROUTE_TYPE_CHOICES[0][0]
    )
    actual_state: CharField = models.CharField(
        choices=STATE_CHOICES, default=STATE_CHOICES[0][0]
    )
    opening_year: IntegerField = models.IntegerField(blank=True, null=True)
    latest_maintenance: DateField = models.DateField(blank=True, null=True)
    gauge: IntegerField = models.IntegerField()
    electrified: CharField = models.CharField(
        choices=ELECTRIFICATION_CHOICES, default=ELECTRIFICATION_CHOICES[0][0]
    )
    electrification_voltage: IntegerField = models.IntegerField(blank=True, null=True)

    def __str__(self):
        if self.nickname:
            return f"{self.start_station} -> {self.end_station} ({self.nickname})"
        else:
            return f"{self.start_station} -> {self.end_station}"


class TrainModel(models.Model):
    """
    This class represents the TrainModel model.
    """

    name: CharField = models.CharField(max_length=256, unique=True)
    type: CharField = models.CharField(
        choices=TRAIN_MODEL_CHOICES, default=TRAIN_MODEL_CHOICES[0][0]
    )
    nickname: CharField = models.CharField(
        max_length=256, unique=True, blank=True, null=True
    )
    max_speed: IntegerField = models.IntegerField()
    seats: IntegerField = models.IntegerField(blank=True, null=True)
    length: FloatField = models.FloatField()
    width: FloatField = models.FloatField()
    height: FloatField = models.FloatField()
    gauge: IntegerField = models.IntegerField()
    weight: IntegerField = models.IntegerField()
    power_output: IntegerField = models.IntegerField()
    power_system: CharField = models.CharField(
        choices=POWER_SYSTEM_CHOICES, default=POWER_SYSTEM_CHOICES[0][0]
    )
    composition: CharField = models.CharField(
        choices=COMPOSITION_CHOICES, default=COMPOSITION_CHOICES[0][0]
    )

    def __str__(self):
        return f"{self.name} ({self.get_type_display()})"


class Train(models.Model):
    """
    This class represents the Train model.
    """

    model: ForeignKey = models.ForeignKey(
        TrainModel, on_delete=models.PROTECT, related_name="trains"
    )
    nickname: CharField = models.CharField(
        max_length=256, unique=True, blank=True, null=True
    )
    number: IntegerField = models.IntegerField()
    actual_state: CharField = models.CharField(
        choices=STATE_CHOICES, default=STATE_CHOICES[0][0]
    )
    construction_year: IntegerField = models.IntegerField()
    year_entered_service: IntegerField = models.IntegerField()
    kilometers_run: IntegerField = models.IntegerField()
    latest_inspection: DateField = models.DateField(blank=True, null=True)
    operator: CharField = models.CharField(max_length=256)
    associated_route: ForeignKey = models.ForeignKey(
        Route, on_delete=models.PROTECT, related_name="trains"
    )

    def __str__(self):
        return f"{self.model} {self.number}"
