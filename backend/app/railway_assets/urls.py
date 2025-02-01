from django.urls import path
from railway_assets.views import (CompositionChoicesView,
                                  ElectrificationChoicesView,
                                  PowerSystemChoicesView, RouteTypeChoicesView,
                                  RouteViewSet, StateChoicesView,
                                  StationViewSet, TrainModelChoicesView,
                                  TrainModelViewSet, TrainViewSet)
from rest_framework.routers import SimpleRouter

app_name = "railway_assets"

router = SimpleRouter()
router.register("stations", StationViewSet, basename="stations")
router.register("routes", RouteViewSet, basename="routes")
router.register("train-models", TrainModelViewSet, basename="train-models")
router.register("trains", TrainViewSet, basename="trains")

urlpatterns = router.urls + [
    path("state-choices/", StateChoicesView.as_view(), name="state-choices"),
    path(
        "train-model-choices/",
        TrainModelChoicesView.as_view(),
        name="train-model-choices",
    ),
    path(
        "power-system-choices/",
        PowerSystemChoicesView.as_view(),
        name="power-system-choices",
    ),
    path(
        "route-type-choices/", RouteTypeChoicesView.as_view(), name="route-type-choices"
    ),
    path(
        "electrification-choices/",
        ElectrificationChoicesView.as_view(),
        name="electrification-choices",
    ),
    path(
        "composition-choices/",
        CompositionChoicesView.as_view(),
        name="composition-choices",
    ),
]
