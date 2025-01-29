from railway_assets.models import Route, Station, Train, TrainModel, STATE_CHOICES, ROUTE_TYPE_CHOICES, \
    ELECTRIFICATION_CHOICES, TRAIN_MODEL_CHOICES, POWER_SYSTEM_CHOICES
from rest_framework import serializers


class ChoiceField(serializers.ChoiceField):
    def to_representation(self, value):
        if value == '' and self.allow_blank:
            return value
        return self.choices.get(value)


class StationSerializer(serializers.ModelSerializer):
    """
    This class represents the Station model serializer.
    """

    actual_state = ChoiceField(choices=STATE_CHOICES)

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

    type = ChoiceField(choices=ROUTE_TYPE_CHOICES)
    actual_state = ChoiceField(choices=STATE_CHOICES)
    electrified = ChoiceField(choices=ELECTRIFICATION_CHOICES)

    start_station = StationSerializer()
    end_station = StationSerializer()

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

    type = ChoiceField(choices=TRAIN_MODEL_CHOICES)
    power_system = ChoiceField(choices=POWER_SYSTEM_CHOICES)

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

    actual_state = ChoiceField(choices=STATE_CHOICES)

    model = TrainModelSerializer()
    associated_route = RouteSerializer()

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
