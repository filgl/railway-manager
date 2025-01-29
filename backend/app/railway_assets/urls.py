from railway_assets.views import (RouteViewSet, StationViewSet,
                                  TrainModelViewSet, TrainViewSet)
from rest_framework.routers import SimpleRouter

app_name = "railway_assets"

router = SimpleRouter()
router.register("stations", StationViewSet, basename="stations")
router.register("routes", RouteViewSet, basename="routes")
router.register("train-models", TrainModelViewSet, basename="train-models")
router.register("trains", TrainViewSet, basename="trains")

urlpatterns = router.urls
