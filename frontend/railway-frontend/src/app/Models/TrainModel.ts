import { Train } from "./Train";

export class TrainModel {
  id!: number;
  name!: string;
  type!: string;
  nickname!: string;
  max_speed!: number;
  seats!: number;
  length!: number;
  width!: number;
  height!: number;
  gauge!: number;
  weight!: number;
  power_output!: number;
  power_system!: string;
  composition!: string;
  trains!: Train[];
}
