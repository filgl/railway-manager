import { Route } from "./Route";

export class Station {
  id!: number;
  name!: string;
  city!: string;
  platforms!: number;
  opening_year!: number;
  main_station!: boolean;
  actual_state!: string;
  start_routes!: Route[];
  end_routes!: Route[];
}
