import { Routes } from '@angular/router';
import {StationsListComponent} from './stations/stations-list/stations-list.component';
import {StationsDetailComponent} from './stations/stations-detail/stations-detail.component';
import {RoutesListComponent} from './routes/routes-list/routes-list.component';
import {RoutesDetailComponent} from './routes/routes-detail/routes-detail.component';
import {TrainModelsListComponent} from './train-models/train-models-list/train-models-list.component';
import {TrainModelsDetailComponent} from './train-models/train-models-detail/train-models-detail.component';
import {TrainsListComponent} from './trains/trains-list/trains-list.component';
import {TrainsDetailComponent} from './trains/trains-detail/trains-detail.component';

export const routes: Routes = [
  { path: 'stations', component: StationsListComponent },
  { path: 'stations/:id', component: StationsDetailComponent },
  { path: 'routes', component: RoutesListComponent },
  { path: 'routes/:id', component: RoutesDetailComponent },
  { path: 'train-models', component: TrainModelsListComponent },
  { path: 'train-models/:id', component: TrainModelsDetailComponent },
  { path: 'trains', component: TrainsListComponent },
  { path: 'trains/:id', component: TrainsDetailComponent }
];
