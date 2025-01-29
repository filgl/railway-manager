import { TrainModel } from "./TrainModel";
import { Route } from "./Route";

export class Train {
  id!: number;
  model!: TrainModel;
  nickname!: string;
  number!: number;
  actual_state!: string;
  construction_year!: number;
  year_entered_service!: number;
  kilometers_run!: number;
  latest_inspection!: string;
  operator!: string;
  associated_route!: Route;
}
