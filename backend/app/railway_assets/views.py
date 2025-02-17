from django.db.models import F, Func
from railway_assets.models import (COMPOSITION_CHOICES,
                                   ELECTRIFICATION_CHOICES,
                                   POWER_SYSTEM_CHOICES, ROUTE_TYPE_CHOICES,
                                   STATE_CHOICES, TRAIN_MODEL_CHOICES, Route,
                                   Station, Train, TrainModel)
from railway_assets.serializers import (RouteSerializer, StationSerializer,
                                        TrainModelSerializer, TrainSerializer)
from rest_framework import status, viewsets
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView


class StationViewSet(viewsets.ModelViewSet):
    """
    This class represents the Station model viewset.
    """

    queryset = Station.objects.prefetch_related("start_routes", "end_routes").annotate(
        lower_name=Func(F("name"), function="LOWER")
    )
    serializer_class = StationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [OrderingFilter]
    ordering_fields = ["lower_name", "id"]
    ordering = ["lower_name"]

    def destroy(self, request, *args, **kwargs):
        """
        This method deletes the Station object from the database if it is not linked to existing routes.

        :param request: The incoming request.
        :return: The outgoing response.
        """

        station = self.get_object()

        if (
            Route.objects.filter(start_station=station).exists()
            or Route.objects.filter(end_station=station).exists()
        ):
            return Response(
                {
                    "error": "This station cannot be deleted because it is linked to one or more routes."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().destroy(request, *args, **kwargs)


class RouteViewSet(viewsets.ModelViewSet):
    """
    This class represents the Route model viewset.
    """

    queryset = Route.objects.prefetch_related("trains").annotate(
        lower_start_station_name=Func(F("start_station__name"), function="LOWER")
    )
    serializer_class = RouteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [OrderingFilter]
    ordering_fields = ["lower_start_station_name", "id"]
    ordering = ["lower_start_station_name"]

    def destroy(self, request, *args, **kwargs):
        """
        This method deletes the Route object from the database if it is not linked to existing stations.

        :param request: The incoming request.
        :return: The outgoing response.
        """

        route = self.get_object()

        if Train.objects.filter(associated_route=route).exists():
            return Response(
                {
                    "error": "This route cannot be deleted because one or more trains run on it."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().destroy(request, *args, **kwargs)


class TrainModelViewSet(viewsets.ModelViewSet):
    """
    This class represents the TrainModel model viewset.
    """

    queryset = TrainModel.objects.prefetch_related("trains").annotate(
        lower_name=Func(F("name"), function="LOWER")
    )
    serializer_class = TrainModelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [OrderingFilter]
    ordering_fields = ["lower_name", "id"]
    ordering = ["lower_name"]

    def destroy(self, request, *args, **kwargs):
        """
        This method deletes the TrainModel from the database if it is not linked to existing trains.

        :param request: The incoming request.
        :return: The outgoing response.
        """

        train_model = self.get_object()

        if Train.objects.filter(model=train_model).exists():
            return Response(
                {
                    "error": "This train model cannot be deleted because it is assigned to one or more trains."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().destroy(request, *args, **kwargs)


class TrainViewSet(viewsets.ModelViewSet):
    """
    This class represents the Train model viewset.
    """

    queryset = Train.objects.all().annotate(
        lower_model=Func(F("model__name"), function="LOWER")
    )
    serializer_class = TrainSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [OrderingFilter]
    ordering_fields = ["lower_model", "id"]
    ordering = ["lower_model"]


class StateChoicesView(APIView):
    """
    This class represents the State choices view.
    """

    def get(self, request):
        """
        This method lists all the available state choices.

        :param request: The incoming request.
        :return: The outgoing response.
        """

        return Response({"state_choices": STATE_CHOICES})


class TrainModelChoicesView(APIView):
    """
    This class represents the Train Model choices view.
    """

    def get(self, request):
        """
        This method lists all the available train model choices.

        :param request: The incoming request.
        :return: The outgoing response.
        """

        return Response({"train_model_choices": TRAIN_MODEL_CHOICES})


class PowerSystemChoicesView(APIView):
    """
    This class represents the Power System choices view.
    """

    def get(self, request):
        """
        This method lists all the available power system choices.

        :param request: The incoming request.
        :return: The outgoing response.
        """

        return Response({"power_system_choices": POWER_SYSTEM_CHOICES})


class RouteTypeChoicesView(APIView):
    """
    This class represents the Route Type choices view.
    """

    def get(self, request):
        """
        This method lists all the available route type choices.

        :param request: The incoming request.
        :return: The outgoing response.
        """

        return Response({"route_type_choices": ROUTE_TYPE_CHOICES})


class ElectrificationChoicesView(APIView):
    """
    This class represents the Electrification choices view.
    """

    def get(self, request):
        """
        This method lists all the available electrification choices.

        :param request: The incoming request.
        :return: The outgoing response.
        """

        return Response({"electrification_choices": ELECTRIFICATION_CHOICES})


class CompositionChoicesView(APIView):
    """
    This class represents the Composition choices view.
    """

    def get(self, request):
        """
        This method lists all the available composition choices.

        :param request: The incoming request.
        :return: The outgoing response.
        """

        return Response({"composition_choices": COMPOSITION_CHOICES})
