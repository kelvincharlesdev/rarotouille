import { DishType } from "./DishType";

export type ItemType = {
  id: string;
  order_id: string;
  dish_id: string;
  amount: number;
  unit_price: string;
  created_at?: string;
  updated_at?: string;
  dish?: DishType;
};
