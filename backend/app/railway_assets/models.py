from datetime import datetime

from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import (BooleanField, CharField, DateField, FloatField,
                              ForeignKey, PositiveBigIntegerField,
                              PositiveIntegerField, PositiveSmallIntegerField)

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
    platforms: PositiveSmallIntegerField = models.PositiveSmallIntegerField()
    opening_year: PositiveSmallIntegerField = models.PositiveSmallIntegerField(
        blank=True, null=True
    )
    main_station: BooleanField = models.BooleanField(default=True)
    actual_state: CharField = models.CharField(
        choices=STATE_CHOICES, default=STATE_CHOICES[0][0]
    )

    def clean(self):
        """
        This function checks if the model being inserted is valid.
        """

        if self.platforms and self.platforms < 1:
            raise ValidationError(
                {"platforms": "Number of platforms must be greater than 0"}
            )

        if self.opening_year and self.opening_year > datetime.now().year:
            raise ValidationError(
                {"opening_year": "Opening year cannot be set in the future"}
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
    max_speed: PositiveSmallIntegerField = models.PositiveSmallIntegerField()
    type: CharField = models.CharField(
        choices=ROUTE_TYPE_CHOICES, default=ROUTE_TYPE_CHOICES[0][0]
    )
    actual_state: CharField = models.CharField(
        choices=STATE_CHOICES, default=STATE_CHOICES[0][0]
    )
    opening_year: PositiveSmallIntegerField = models.PositiveSmallIntegerField(
        blank=True, null=True
    )
    latest_maintenance: DateField = models.DateField(blank=True, null=True)
    gauge: PositiveSmallIntegerField = models.PositiveSmallIntegerField()
    electrified: CharField = models.CharField(
        choices=ELECTRIFICATION_CHOICES, default=ELECTRIFICATION_CHOICES[0][0]
    )
    electrification_voltage: PositiveIntegerField = models.PositiveIntegerField(
        blank=True, null=True
    )

    def clean(self):
        """
        This function checks if the model being inserted is valid.
        """

        try:
            if (
                self.start_station
                and self.end_station
                and self.start_station == self.end_station
            ):
                raise ValidationError(
                    "Start station and end station cannot be the same"
                )
        except Station.DoesNotExist:
            raise ValidationError("Start and end stations must be set")

        try:
            if (
                self.start_station
                and self.opening_year
                and self.start_station.opening_year
                and self.start_station.opening_year > self.opening_year
            ):
                raise ValidationError(
                    {
                        "opening_year": f"Route cannot open before the opening of the start station ({self.start_station.opening_year})"
                    }
                )
        except Station.DoesNotExist:
            raise ValidationError("Start station must be set")

        try:
            if (
                self.end_station
                and self.opening_year
                and self.end_station.opening_year
                and self.end_station.opening_year > self.opening_year
            ):
                raise ValidationError(
                    {
                        "opening_year": f"Route cannot open before the opening of the end station ({self.end_station.opening_year})"
                    }
                )
        except Station.DoesNotExist:
            raise ValidationError("End station must be set")

        if self.length and self.length < 1.0:
            raise ValidationError(
                {"length": "Route length must be greater than 1.0 km"}
            )

        if self.max_speed and self.max_speed < 1:
            raise ValidationError(
                {"max_speed": "Maximum speed must be at least 1 km/h"}
            )

        if self.opening_year and self.opening_year > datetime.now().year:
            raise ValidationError(
                {"opening_year": "Opening year cannot be set in the future"}
            )

        if self.latest_maintenance and self.latest_maintenance > datetime.now().date():
            raise ValidationError(
                {
                    "latest_maintenance": "Latest maintenance date cannot be set in the future"
                }
            )

        if (
            self.opening_year
            and self.latest_maintenance
            and self.latest_maintenance.year < self.opening_year
        ):
            raise ValidationError(
                {
                    "latest_maintenance": f"Latest maintenance date cannot be set before route opening year ({self.opening_year})"
                }
            )

        if self.gauge and self.gauge < 1:
            raise ValidationError({"gauge": "Gauge must be at least 1 mm"})

        if (
            self.electrified in ["electrified", "partially"]
            and not self.electrification_voltage
        ):
            raise ValidationError(
                {
                    "electrification_voltage": "Electrification voltage must be set if the route is electrified"
                }
            )

        if self.electrification_voltage and self.electrification_voltage < 1:
            raise ValidationError(
                {
                    "electrification_voltage": "Electrification voltage must be at least 1 V"
                }
            )

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
    max_speed: PositiveSmallIntegerField = models.PositiveSmallIntegerField()
    seats: PositiveSmallIntegerField = models.PositiveSmallIntegerField(
        blank=True, null=True
    )
    length: FloatField = models.FloatField()
    width: FloatField = models.FloatField()
    height: FloatField = models.FloatField()
    gauge: PositiveSmallIntegerField = models.PositiveSmallIntegerField()
    weight: PositiveIntegerField = models.PositiveIntegerField()
    power_output: PositiveIntegerField = models.PositiveIntegerField()
    power_system: CharField = models.CharField(
        choices=POWER_SYSTEM_CHOICES, default=POWER_SYSTEM_CHOICES[0][0]
    )
    composition: CharField = models.CharField(
        choices=COMPOSITION_CHOICES, default=COMPOSITION_CHOICES[0][0]
    )

    def clean(self):
        """
        This function checks if the model being inserted is valid.
        """

        if self.max_speed and self.max_speed < 1:
            raise ValidationError(
                {"max_speed": "Maximum speed must be at least 1 km/h"}
            )

        if self.seats and self.seats < 1:
            raise ValidationError({"seats": "Number of seats must be greater than 0"})

        if self.length and self.length < 1.0:
            raise ValidationError({"length": "Train length must be at least 1 m"})

        if self.width and self.width < 1.0:
            raise ValidationError({"width": "Train width must be at least 1 m"})

        if self.height and self.height < 1.0:
            raise ValidationError({"height": "Train height must be at least 1 m"})

        if self.gauge and self.gauge < 1:
            raise ValidationError({"gauge": "Gauge must be at least 1 mm"})

        if self.weight and self.weight < 1:
            raise ValidationError({"weight": "Weight must be at least 1 t"})

        if self.power_output and self.power_output < 1:
            raise ValidationError(
                {"power_output": "Power output must be at least 1 kW"}
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
    number: PositiveSmallIntegerField = models.PositiveSmallIntegerField()
    actual_state: CharField = models.CharField(
        choices=STATE_CHOICES, default=STATE_CHOICES[0][0]
    )
    construction_year: PositiveSmallIntegerField = models.PositiveSmallIntegerField()
    year_entered_service: PositiveSmallIntegerField = models.PositiveSmallIntegerField()
    kilometers_run: PositiveBigIntegerField = models.PositiveBigIntegerField()
    latest_inspection: DateField = models.DateField(blank=True, null=True)
    operator: CharField = models.CharField(max_length=256)
    associated_route: ForeignKey = models.ForeignKey(
        Route, on_delete=models.PROTECT, related_name="trains"
    )

    def clean(self):
        """
        This function checks if the model being inserted is valid.
        """

        if self.number and self.number < 1:
            raise ValidationError({"number": "Train number must be at least 1"})

        try:
            if self.model and self.number:
                existing_train = Train.objects.filter(
                    model=self.model, number=self.number
                ).exclude(id=self.id)
                if existing_train.exists():
                    raise ValidationError(
                        {
                            "number": f"A train of the same model ({self.model.name}) with the same number already exists"
                        }
                    )
        except TrainModel.DoesNotExist:
            raise ValidationError({"model": "Train model must be set"})

        if self.construction_year and self.construction_year > datetime.now().year:
            raise ValidationError(
                {
                    "construction_year": "Train construction year cannot be set in the future"
                }
            )

        if (
            self.year_entered_service
            and self.year_entered_service > datetime.now().year
        ):
            raise ValidationError(
                {
                    "year_entered_service": "Year in which the train entered service cannot be set in the future"
                }
            )

        if (
            self.construction_year
            and self.year_entered_service
            and self.construction_year > self.year_entered_service
        ):
            raise ValidationError(
                f"Train cannot enter service before being constructed ({self.construction_year})"
            )

        if self.latest_inspection and self.latest_inspection > datetime.now().date():
            raise ValidationError(
                {
                    "latest_inspection": "Latest inspection date cannot be set in the future"
                }
            )

        if (
            self.latest_inspection
            and self.latest_inspection.year < self.year_entered_service
        ):
            raise ValidationError(
                f"Inspection cannot be done before the train enters service ({self.year_entered_service})"
            )

        try:
            if (
                self.model
                and self.associated_route
                and self.model.gauge != self.associated_route.gauge
            ):
                raise ValidationError(
                    f"Train gauge ({self.model.gauge}) must be the same as the route ({self.associated_route.gauge})"
                )
        except TrainModel.DoesNotExist:
            raise ValidationError({"model": "Train model must be set"})
        except Route.DoesNotExist:
            raise ValidationError({"model": "Associated route must be set"})

        try:
            if (
                self.associated_route
                and self.model
                and self.associated_route.type != "mixed"
                and self.model.type != self.associated_route.type
            ):
                raise ValidationError(
                    f"Train type ({self.model.get_type_display()}) must be the same as the route ({self.associated_route.get_type_display()})"
                )
        except TrainModel.DoesNotExist:
            raise ValidationError({"model": "Train model must be set"})
        except Route.DoesNotExist:
            raise ValidationError({"model": "Associated route must be set"})

        try:
            if (
                self.associated_route
                and self.model
                and self.associated_route.electrified
                not in ["electrified", "partially"]
                and self.model.power_system == "electric"
            ):
                raise ValidationError(
                    f"Train power system ({self.model.get_power_system_display()}) is not adequate for the selected route ({self.associated_route.get_electrified_display()})"
                )
        except TrainModel.DoesNotExist:
            raise ValidationError({"model": "Train model must be set"})
        except Route.DoesNotExist:
            raise ValidationError({"model": "Associated route must be set"})

    def __str__(self):
        return f"{self.model} {self.number}"
