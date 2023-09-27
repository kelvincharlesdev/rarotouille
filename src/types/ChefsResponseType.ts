import { MetaType } from "./MetaType";
import { UserResponseType } from "./UserResponseType";

export type ChefsResponseType = {
  data: UserResponseType[];
  meta: MetaType;
};
