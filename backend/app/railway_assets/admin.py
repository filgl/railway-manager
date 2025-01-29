from django.contrib import admin
from railway_assets.models import Route, Station, Train, TrainModel

admin.site.register(Station)
admin.site.register(Route)
admin.site.register(TrainModel)
admin.site.register(Train)
