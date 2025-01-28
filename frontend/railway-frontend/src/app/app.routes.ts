import { Routes } from '@angular/router';
import {StationsComponent} from './stations/stations.component';
import {TrainModelComponent} from './train-model/train-model.component';
import {RoutesComponent} from './routes/routes.component';
import {TrainComponent} from './train/train.component';

export const routes: Routes = [
  { path: 'stations', component: StationsComponent },
  { path: 'routes', component: RoutesComponent },
  { path: 'train-models', component: TrainModelComponent },
  { path: 'trains', component: TrainComponent }
];
