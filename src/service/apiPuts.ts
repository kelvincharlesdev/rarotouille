import { ResetPasswordType } from "../types/ResetPasswordType";
import { api } from "./api";

export const restetPassword = async (values: ResetPasswordType) => {
    try {
      const response = await api.put("/passwords/reset", values);
      return response;
    } catch (error) {
      console.log(error);
    }
};
