import { AddresPostType } from "../types/AddressPostType";
import { DishPostType } from "../types/DishPostType";
import { ForgetPasswordType } from "../types/ForgetPasswordType";
import { LikePostType } from "../types/LikePostType";
import { LoginPostType } from "../types/LoginPostType";
import { OrderItemResponseType } from "../types/OrderItemResponseType";
import { OrderPostType } from "../types/OrderPostType";
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

export const sessionRefresh = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  const access_token = localStorage.getItem("access_token");

  if (access_token)
    if (refresh_token)
      try {
        const response = await api.post(
          "/sessions/refresh",
          {
            auth: {
              refresh_token: refresh_token
            }
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

export const postAddress = async (values: AddresPostType) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.post(
        "/clients/addresses",
        {
          address: values
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

//TODO Ver se é necessário essa requisição
export const postChef = async (formData: SignUpPostType) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await api.post(
      "/chefs",
      {
        chef: formData
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

export const postOrder = async (values: OrderPostType) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await api.post(
      "/clients/orders",
      {
        order: values
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

//TODO perguntar se precisa tipar isso
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

//TODO ver se essa requisição é necessária
export const postChefTelephone = async (
  chef_id: string,
  phone_number: TelephoneUpdateType
) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.post(
        `/chefs/${chef_id}/telephones`,
        {
          telephone: phone_number
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

//TODO ver se é necessário
export const postDish = async (chef_id: string, dish: DishPostType) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.post(
        `/chefs/${chef_id}/dishes`,
        {
          dish: dish
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

//TODO testar depois pq não tá funcionando a rota
export const like = async (like: LikePostType) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.post(
        "/likes",
        {
          like: like
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
