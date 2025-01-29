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

    start_routes = RouteBriefSerializer(many=True)
    end_routes = RouteBriefSerializer(many=True)

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


class RouteSerializer(serializers.ModelSerializer):
    """
    This class represents the Route model serializer.
    """

    type = ChoiceField(choices=ROUTE_TYPE_CHOICES)
    actual_state = ChoiceField(choices=STATE_CHOICES)
    electrified = ChoiceField(choices=ELECTRIFICATION_CHOICES)

    start_station = StationBriefSerializer()
    end_station = StationBriefSerializer()

    trains = TrainBriefSerializer(many=True)

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
