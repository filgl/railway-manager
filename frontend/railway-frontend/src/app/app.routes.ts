import { Routes } from '@angular/router';
import {StationsComponent} from './stations/stations.component';
import {TrainModelsComponent} from './train-models/train-models.component';
import {RoutesComponent} from './routes/routes.component';
import {TrainsComponent} from './trains/trains.component';

export const routes: Routes = [
  { path: 'stations', component: StationsComponent },
  { path: 'routes', component: RoutesComponent },
  { path: 'train-models', component: TrainModelsComponent },
  { path: 'trains', component: TrainsComponent }
];
