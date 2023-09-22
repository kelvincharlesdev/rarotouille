//TODO corrigir depois a tipagem do address e telephoes

import { AddressResponseType } from "./AddressResponseType";
import { TelephoneType } from "./TelephoneType";

export type ClientType = {
  name: string;
  email: string;
  telephones_attributes: TelephoneType[];
  addresses_attributes: AddressResponseType[];
};
