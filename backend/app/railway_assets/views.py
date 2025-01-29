from railway_assets.models import (COMPOSITION_CHOICES,
                                   ELECTRIFICATION_CHOICES,
                                   POWER_SYSTEM_CHOICES, ROUTE_TYPE_CHOICES,
                                   STATE_CHOICES, TRAIN_MODEL_CHOICES, Route,
                                   Station, Train, TrainModel)
from railway_assets.serializers import (RouteSerializer, StationSerializer,
                                        TrainModelSerializer, TrainSerializer)
from rest_framework import viewsets
from rest_framework.response import Response


class StationViewSet(viewsets.ModelViewSet):
    """
    This class represents the Station model viewset.
    """

    queryset = Station.objects.prefetch_related("start_routes", "end_routes")
    serializer_class = StationSerializer


class RouteViewSet(viewsets.ModelViewSet):
    """
    This class represents the Route model viewset.
    """

    queryset = Route.objects.prefetch_related("trains")
    serializer_class = RouteSerializer


class TrainModelViewSet(viewsets.ModelViewSet):
    """
    This class represents the TrainModel model viewset.
    """

    queryset = TrainModel.objects.prefetch_related("trains")
    serializer_class = TrainModelSerializer


class TrainViewSet(viewsets.ModelViewSet):
    """
    This class represents the Train model viewset.
    """

    queryset = Train.objects.all()
    serializer_class = TrainSerializer


class StateChoicesViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This class represents the State choices viewset.
    """

    def list(self, request, *args, **kwargs):
        """
        This method lists all the available state choices.
        """

        return Response({"state_choices": STATE_CHOICES})


class TrainModelChoicesViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This class represents the Train Model choices viewset.
    """

    def list(self, request, *args, **kwargs):
        """
        This method lists all the available train model choices.
        """

        return Response({"train_model_choices": TRAIN_MODEL_CHOICES})


class PowerSystemChoicesViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This class represents the Power System choices viewset.
    """

    def list(self, request, *args, **kwargs):
        """
        This method lists all the available power system choices.
        """

        return Response({"power_system_choices": POWER_SYSTEM_CHOICES})


class RouteTypeChoicesViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This class represents the Route Type choices viewset.
    """

    def list(self, request, *args, **kwargs):
        """
        This method lists all the available route type choices.
        """

        return Response({"route_type_choices": ROUTE_TYPE_CHOICES})


class ElectrificationChoicesViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This class represents the Electrification choices viewset.
    """

    def list(self, request, *args, **kwargs):
        """
        This method lists all the available electrification choices.
        """

        return Response({"electrification_choices": ELECTRIFICATION_CHOICES})


class CompositionChoicesViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This class represents the Composition choices viewset.
    """

    def list(self, request, *args, **kwargs):
        """
        This method lists all the available composition choices.
        """

        return Response({"composition_choices": COMPOSITION_CHOICES})
