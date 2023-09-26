import { OrderItemType } from "./OrderItemType";

export type OrderPostType = {
  delivery_address_id: string;
  items_attributes: OrderItemType[];
};
