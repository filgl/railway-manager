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

    trains = TrainBriefSerializer(many=True)

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

    class Meta:
        model = Route
        fields = [
            "id",
            "start_station",
            "end_station",
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

    def validate(self, data):
        """
        This function validates the Route data.
        """

        try:
            if (
                data.get("start_station")
                and data.get("end_station")
                and data.get("start_station") == data.get("end_station")
            ):
                raise serializers.ValidationError(
                    "Start station and end station cannot be the same"
                )
        except Station.DoesNotExist:
            raise serializers.ValidationError("Start and end stations must be set")

        try:
            if (
                data.get("start_station")
                and data.get("opening_year")
                and data.get("start_station.opening_year")
                and data.get("start_station.opening_year") > data.get("opening_year")
            ):
                raise serializers.ValidationError(
                    f"Route cannot open before the opening of the start station ({data.get("start_station.opening_year")})"
                )
        except Station.DoesNotExist:
            raise serializers.ValidationError("Start station must be set")

        try:
            if (
                data.get("end_station")
                and data.get("opening_year")
                and data.get("end_station.opening_year")
                and data.get("end_station.opening_year") > data.get("opening_year")
            ):
                raise serializers.ValidationError(
                    f"Route cannot open before the opening of the end station ({data.get("end_station.opening_year")})"
                )
        except Station.DoesNotExist:
            raise serializers.ValidationError("End station must be set")

        if data.get("length") and data.get("length") < 1.0:
            raise serializers.ValidationError(
                {"length": "Route length must be greater than 1.0 km"}
            )

        if data.get("max_speed") and data.get("max_speed") < 1:
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
            data.get("opening_year")
            and data.get("latest_maintenance")
            and data.get("latest_maintenance.year") < data.get("opening_year")
        ):
            raise serializers.ValidationError(
                f"Latest maintenance date cannot be set before route opening year ({data.get("opening_year")})"
            )

        if data.get("gauge") and data.get("gauge") < 1:
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

    model = TrainModelBriefSerializer()
    associated_route = RouteBriefSerializer()

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
