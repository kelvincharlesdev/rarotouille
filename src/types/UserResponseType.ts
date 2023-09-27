import { AddressResponseType } from "./AddressResponseType";
import { TelephoneType } from "./TelephoneType";

//TODO ver se dá pra colocar esse tipo no lugar de ChefType
export type UserResponseType = {
  id: string;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  addresses: AddressResponseType[];
  telephones?: TelephoneType[];
};
