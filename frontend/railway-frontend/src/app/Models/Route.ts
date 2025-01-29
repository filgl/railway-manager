import {Station} from './Station';

export class Route {
  id!: number;
  start_station!: Station;
  end_station!: Station;
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
}
