from railway_assets.models import Route, Station, Train, TrainModel
from railway_assets.serializers import (RouteSerializer, StationSerializer,
                                        TrainModelSerializer, TrainSerializer)
from rest_framework import viewsets


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
