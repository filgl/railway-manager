from railway_assets.models import Route, Station, Train, TrainModel
from rest_framework import serializers


class StationSerializer(serializers.ModelSerializer):
    """
    This class represents the Station model serializer.
    """

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
        ]


class RouteSerializer(serializers.ModelSerializer):
    """
    This class represents the Route model serializer.
    """

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
        ]


class TrainModelSerializer(serializers.ModelSerializer):
    """
    This class represents the TrainModel model serializer.
    """

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
        ]


class TrainSerializer(serializers.ModelSerializer):
    """
    This class represents the Train model serializer.
    """

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
