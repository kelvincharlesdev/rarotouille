import { ForgetPasswordType } from "../types/ForgetPasswordType";
import { LoginPostType } from "../types/LoginPostType";
import { SessionRefreshType } from "../types/SessionRefreshType";
import { SignUpPostType } from "../types/SignUpPostType";
import { api } from "./api";

export const signUp = async (values: SignUpPostType) => {
  try {
    const response = await api.post("/registrations/signup", values);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (values: LoginPostType) => {
    try {
      const response = await api.post("/sessions/login", values);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const forgetPassord = async (value: ForgetPasswordType) => {
    try {
      const response = await api.post("/passwords/token", value);
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const sessionRefresh = async (value: SessionRefreshType) => {
    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");

    if(refresh_token)
    value.auth.refresh_token = refresh_token;

    if(access_token)
    try {
      const response = await api.post("/sessions/refresh", value,{
        headers:{
          Authorization:`Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};