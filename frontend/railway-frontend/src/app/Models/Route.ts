import { Station } from "./Station";
import { Train } from "./Train";

export class Route {
  id!: number;
  start_station!: Station;
  start_station_name!: string;
  end_station!: Station;
  end_station_name!: string;
  nickname!: string;
  length!: number;
  max_speed!: number;
  type!: string;
  actual_state!: string;
  opening_year!: number;
  latest_maintenance!: string;
  gauge!: number;
  electrified!: string;
  electrification_voltage!: number;
  trains!: Train[];
}
