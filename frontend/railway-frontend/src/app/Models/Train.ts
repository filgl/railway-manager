import { TrainModel } from "./TrainModel";

export class Train {
  id!: number;
  model!: TrainModel;
  model_name!: string;
  nickname!: string;
  number!: number;
  actual_state!: string;
  construction_year!: number;
  year_entered_service!: number;
  kilometers_run!: number;
  latest_inspection!: string;
  operator!: string;
  associated_route!: number;
  associated_route_name!: string;
}
