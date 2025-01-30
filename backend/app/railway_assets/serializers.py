from datetime import datetime

from railway_assets.models import (COMPOSITION_CHOICES,
                                   ELECTRIFICATION_CHOICES,
                                   POWER_SYSTEM_CHOICES, ROUTE_TYPE_CHOICES,
                                   STATE_CHOICES, TRAIN_MODEL_CHOICES, Route,
                                   Station, Train, TrainModel)
from rest_framework import serializers


class ChoiceField(serializers.ChoiceField):
    """
    This class represents the choice field for the serializer.
    """

    def to_representation(self, value):
        """
        This method returns the choice value.
        """

        if value == "" and self.allow_blank:
            return value
        return self.choices.get(value)


class StationBriefSerializer(serializers.ModelSerializer):
    """
    This class represents the Station model brief serializer.
    """

    class Meta:
        model = Station
        fields = [
            "id",
            "name",
        ]


class TrainModelBriefSerializer(serializers.ModelSerializer):
    """
    This class represents the TrainModel model brief serializer.
    """

    class Meta:
        model = TrainModel
        fields = [
            "id",
            "name",
        ]


class TrainBriefSerializer(serializers.ModelSerializer):
    """
    This class represents the Train model brief serializer.
    """

    model = TrainModelBriefSerializer()

    class Meta:
        model = Train
        fields = [
            "id",
            "model",
            "number",
        ]


class TrainModelSerializer(serializers.ModelSerializer):
    """
    This class represents the TrainModel model serializer.
    """

    type = ChoiceField(choices=TRAIN_MODEL_CHOICES)
    power_system = ChoiceField(choices=POWER_SYSTEM_CHOICES)
    composition = ChoiceField(choices=COMPOSITION_CHOICES)

    trains = TrainBriefSerializer(many=True, read_only=True)

    class Meta:
        model = TrainModel
        fields = [
            "id",
            "name",
            "type",
            "nickname",
            "max_speed",
            "seats",
            "length",
            "width",
            "height",
            "gauge",
            "weight",
            "power_output",
            "power_system",
            "composition",
            "trains",
        ]

    def validate(self, data):
        """
        This function validates the TrainModel data.
        """

        if data.get("max_speed") < 1:
            raise serializers.ValidationError(
                {"max_speed": "Maximum speed must be at least 1 km/h"}
            )

        if data.get("seats") and data.get("seats") < 1:
            raise serializers.ValidationError(
                {"seats": "Number of seats must be greater than 0"}
            )

        if data.get("length") < 1.0:
            raise serializers.ValidationError(
                {"length": "Train length must be at least 1 m"}
            )

        if data.get("width") < 1.0:
            raise serializers.ValidationError(
                {"width": "Train width must be at least 1 m"}
            )

        if data.get("height") < 1.0:
            raise serializers.ValidationError(
                {"height": "Train height must be at least 1 m"}
            )

        if data.get("gauge") < 1:
            raise serializers.ValidationError({"gauge": "Gauge must be at least 1 mm"})

        if data.get("weight") < 1:
            raise serializers.ValidationError({"weight": "Weight must be at least 1 t"})

        if data.get("power_output") < 1:
            raise serializers.ValidationError(
                {"power_output": "Power output must be at least 1 kW"}
            )

        return data


class RouteBriefSerializer(serializers.ModelSerializer):
    """
    This class represents the Route model brief serializer.
    """

    start_station = StationBriefSerializer()
    end_station = StationBriefSerializer()

    class Meta:
        model = Route
        fields = [
            "id",
            "start_station",
            "end_station",
        ]


class StationSerializer(serializers.ModelSerializer):
    """
    This class represents the Station model serializer.
    """

    actual_state = ChoiceField(choices=STATE_CHOICES)

    start_routes = RouteBriefSerializer(many=True, read_only=True)
    end_routes = RouteBriefSerializer(many=True, read_only=True)

    class Meta:
        model = Station
        fields = [
            "id",
            "name",
            "city",
            "platforms",
            "opening_year",
            "main_station",
            "actual_state",
            "start_routes",
            "end_routes",
        ]

    def validate(self, data):
        """
        This function validates the Station data.
        """

        if data.get("platforms") < 1:
            raise serializers.ValidationError(
                {"platforms": "Number of platforms must be greater than 0"}
            )

        if data.get("opening_year") and data.get("opening_year") > datetime.now().year:
            raise serializers.ValidationError(
                {"opening_year": "Opening year cannot be set in the future"}
            )

        return data


class RouteSerializer(serializers.ModelSerializer):
    """
    This class represents the Route model serializer.
    """

    type = ChoiceField(choices=ROUTE_TYPE_CHOICES)
    actual_state = ChoiceField(choices=STATE_CHOICES)
    electrified = ChoiceField(choices=ELECTRIFICATION_CHOICES)

    start_station = serializers.PrimaryKeyRelatedField(queryset=Station.objects.all())
    end_station = serializers.PrimaryKeyRelatedField(queryset=Station.objects.all())

    trains = TrainBriefSerializer(many=True, read_only=True)

    start_station_name = serializers.SerializerMethodField()
    end_station_name = serializers.SerializerMethodField()

    class Meta:
        model = Route
        fields = [
            "id",
            "start_station",
            "start_station_name",
            "end_station",
            "end_station_name",
            "nickname",
            "length",
            "max_speed",
            "type",
            "actual_state",
            "opening_year",
            "latest_maintenance",
            "gauge",
            "electrified",
            "electrification_voltage",
            "trains",
        ]

    def get_start_station_name(self, obj):
        """
        This function returns the start station name.
        """

        return f"{obj.start_station.name}"

    def get_end_station_name(self, obj):
        """
        This function returns the end station name.
        """

        return f"{obj.end_station.name}"

    def validate(self, data):
        """
        This function validates the Route data.
        """

        start_station = data.get("start_station")
        end_station = data.get("end_station")

        if isinstance(start_station, int):
            start_station = Station.objects.get(id=start_station)

        if isinstance(end_station, int):
            start_station = Station.objects.get(id=end_station)

        if start_station == end_station:
            raise serializers.ValidationError(
                "Start station and end station cannot be the same"
            )

        if (
            start_station.opening_year
            and data.get("opening_year")
            and start_station.opening_year > data.get("opening_year")
        ):
            raise serializers.ValidationError(
                {
                    "opening_year": f"Route cannot open before the opening of the start station ({start_station.opening_year})"
                }
            )

        if (
            end_station.opening_year
            and data.get("opening_year")
            and end_station.opening_year > data.get("opening_year")
        ):
            raise serializers.ValidationError(
                {
                    "opening_year": f"Route cannot open before the opening of the end station ({end_station.opening_year})"
                }
            )

        if data.get("length") < 1.0:
            raise serializers.ValidationError(
                {"length": "Route length must be greater than 1.0 km"}
            )

        if data.get("max_speed") < 1:
            raise serializers.ValidationError(
                {"max_speed": "Maximum speed must be at least 1 km/h"}
            )

        if data.get("opening_year") and data.get("opening_year") > datetime.now().year:
            raise serializers.ValidationError(
                {"opening_year": "Opening year cannot be set in the future"}
            )

        if (
            data.get("latest_maintenance")
            and data.get("latest_maintenance") > datetime.now().date()
        ):
            raise serializers.ValidationError(
                {
                    "latest_maintenance": "Latest maintenance date cannot be set in the future"
                }
            )

        if (
            data.get("latest_maintenance")
            and data.get("opening_year")
            and data.get("latest_maintenance").year < data.get("opening_year")
        ):
            raise serializers.ValidationError(
                {
                    "latest_maintenance": f"Latest maintenance date cannot be set before route opening year ({data.get("opening_year")})"
                }
            )

        if data.get("gauge") < 1:
            raise serializers.ValidationError({"gauge": "Gauge must be at least 1 mm"})

        if data.get("electrified") in ["electrified", "partially"] and not data.get(
            "electrification_voltage"
        ):
            raise serializers.ValidationError(
                {
                    "electrification_voltage": "Electrification voltage must be set if the route is electrified"
                }
            )

        if (
            data.get("electrification_voltage")
            and data.get("electrification_voltage") < 1
        ):
            raise serializers.ValidationError(
                {
                    "electrification_voltage": "Electrification voltage must be at least 1 V"
                }
            )

        return data


class TrainSerializer(serializers.ModelSerializer):
    """
    This class represents the Train model serializer.
    """

    actual_state = ChoiceField(choices=STATE_CHOICES)

    model = serializers.PrimaryKeyRelatedField(queryset=TrainModel.objects.all())
    associated_route = serializers.PrimaryKeyRelatedField(queryset=Route.objects.all())

    class Meta:
        model = Train
        fields = [
            "id",
            "model",
            "nickname",
            "number",
            "actual_state",
            "construction_year",
            "year_entered_service",
            "kilometers_run",
            "latest_inspection",
            "operator",
            "associated_route",
        ]

    def validate(self, data):
        """
        This function validates the Train data.
        """

        if data.get("number") < 1:
            raise serializers.ValidationError(
                {"number": "Train number must be at least 1"}
            )

        existing_train = Train.objects.filter(
            model=data.get("model"), number=data.get("number")
        ).exclude(id=data.get("id"))
        if existing_train.exists():
            raise serializers.ValidationError(
                {
                    "number": f"A train of the same model with the same number already exists"
                }
            )

        if data.get("construction_year") > datetime.now().year:
            raise serializers.ValidationError(
                {
                    "construction_year": "Train construction year cannot be set in the future"
                }
            )

        if data.get("year_entered_service") > datetime.now().year:
            raise serializers.ValidationError(
                {
                    "year_entered_service": "Year in which the train entered service cannot be set in the future"
                }
            )

        if data.get("construction_year") > data.get("year_entered_service"):
            raise serializers.ValidationError(
                {
                    "year_entered_service": f"Train cannot enter service before being constructed ({data.get("construction_year")})"
                }
            )

        if (
            data.get("latest_inspection")
            and data.get("latest_inspection") > datetime.now().date()
        ):
            raise serializers.ValidationError(
                {
                    "latest_inspection": "Latest inspection date cannot be set in the future"
                }
            )

        if data.get("latest_inspection") and data.get(
            "latest_inspection"
        ).year < data.get("year_entered_service"):
            raise serializers.ValidationError(
                {
                    "latest_inspection": f"Inspection cannot be done before the train enters service ({data.get("year_entered_service")})"
                }
            )

        model = TrainModel.objects.get(id=data.get("model").id)
        route = Route.objects.get(id=data.get("associated_route").id)

        if model.gauge != route.gauge:
            raise serializers.ValidationError(
                f"Train gauge ({model.gauge}) must be the same as the route ({route.gauge})"
            )

        if model.type != "mixed" and route.type != model.type:
            raise serializers.ValidationError(
                f"Train type ({model.get_type_display()}) must be the same as the route ({route.get_type_display()})"
            )

        if (
            route.electrified not in ["electrified", "partially"]
            and model.power_system == "electric"
        ):
            raise serializers.ValidationError(
                f"Train power system ({model.get_power_system_display()}) is not adequate for the selected route ({route.get_electrified_display()})"
            )

        return data
