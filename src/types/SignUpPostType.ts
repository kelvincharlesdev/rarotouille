import { IAddresses, ITelephones } from "../pages/SignUpPassOne";

export type SignUpPostType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  telephones_attributes: ITelephones[];
  addresses_attributes: IAddresses[];
  cpf: string;
  termsCheck?: boolean;
};
