//TODO Trocar os objects pelos tipos, item, dishs

import { AddressResponseType } from "./AddressResponseType";
import { ItemType } from "./ItemType";

export type OrderResponseType = {
  id: string;
  client_id: string;
  delivery_address_id: string;
  total_price: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  delivery_address: AddressResponseType;
  items: ItemType[];
};
