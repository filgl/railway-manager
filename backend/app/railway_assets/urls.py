from railway_assets.views import (CompositionChoicesViewSet,
                                  ElectrificationChoicesViewSet,
                                  PowerSystemChoicesViewSet,
                                  RouteTypeChoicesViewSet, RouteViewSet,
                                  StateChoicesViewSet, StationViewSet,
                                  TrainModelChoicesViewSet, TrainModelViewSet,
                                  TrainViewSet)
from rest_framework.routers import SimpleRouter

app_name = "railway_assets"

router = SimpleRouter()
router.register("stations", StationViewSet, basename="stations")
router.register("routes", RouteViewSet, basename="routes")
router.register("train-models", TrainModelViewSet, basename="train-models")
router.register("trains", TrainViewSet, basename="trains")
router.register("state-choices", StateChoicesViewSet, basename="state-choices")
router.register(
    "train-model-choices", TrainModelChoicesViewSet, basename="train-model-choices"
)
router.register(
    "power-system-choices", PowerSystemChoicesViewSet, basename="power-system-choices"
)
router.register(
    "route-type-choices", RouteTypeChoicesViewSet, basename="route-type-choices"
)
router.register(
    "electrification-choices",
    ElectrificationChoicesViewSet,
    basename="electrification-choices",
)
router.register(
    "composition-choices", CompositionChoicesViewSet, basename="composition-choices"
)

urlpatterns = router.urls
