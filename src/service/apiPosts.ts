import { AddresPostType } from "../types/AddressPostType";
import { DishPostType } from "../types/DishPostType";
import { ForgetPasswordType } from "../types/ForgetPasswordType";
import { LoginPostType } from "../types/LoginPostType";
import { OrderItemResponseType } from "../types/OrderItemResponseType";
import { OrderPostType } from "../types/OrderPostType";
import { OrderResponseType } from "../types/OrderResponseType";
import { RatingPostType } from "../types/RatingPostType";
import { SessionRefreshType } from "../types/SessionRefreshType";
import { SignUpPostType } from "../types/SignUpPostType";
import { TelephoneUpdateType } from "../types/TelephoneUpdateType";
import { api } from "./api";
export const signUp = async (formData: SignUpPostType) => {
  try {
    const response = await api.post("/registrations/signup", {
      user: formData
    });
    return response;
  } catch (error) {
    return "Error 422";
  }
};

export const login = async (values: LoginPostType) => {
  try {
    const response = await api.post("/sessions/login", {
      session: {
        email: values.email,
        password: values.password
      }
    });
    // TODO Verficar salvamento no localStorage

    if (response) {
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      return response;
    }
  } catch (error) {
    return "Error 401";
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

export const sessionRefresh = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
    if (refresh_token){
      try {
        const response = await api.post<SessionRefreshType>(
          "/sessions/refresh",{
            auth: {
              refresh_token: refresh_token
            }
          },
        );
        if(response.status === 200){
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
        }
        return response;
      } catch (error) {
        console.log(error);
      }
  }
};

export const postAddress = async (values: AddresPostType) => {
    try {
      const response = await api.post(
        "/clients/addresses",
        {
          address: values
        },
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};


export const postOrder = async (values: OrderPostType) => {
  try {
    const response = await api.post<OrderResponseType>(
      "/clients/orders",
      {
        order: values
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postOrderItem = async (
  order_id: string,
  values: OrderItemResponseType
) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.post(
        `/clients/orders/${order_id}/order_items`,
        {
          order_item: values
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const postClientTelephone = async (
  phone_number: TelephoneUpdateType
) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.post(
        "/clients/telephones",
        {
          telephone: phone_number
        },
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const postRating = async (values: RatingPostType, dish_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.post(
        `/dishes/${dish_id}/ratings`,
        {
          rating: values
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};
