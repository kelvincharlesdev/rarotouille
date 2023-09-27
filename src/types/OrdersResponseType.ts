import { MetaType } from "./MetaType";
import { OrderType } from "./OrderType";

export type OrdersResponseType = {
  data: OrderType[];
  meta: MetaType;
};
