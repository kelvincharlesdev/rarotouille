import { StateType } from "./StateType";

export type CityType = {
  id: string;
  name: string;
  state_id: string;
  created_at?: string;
  updated_at?: string;
  state: StateType;
};
