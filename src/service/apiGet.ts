import { IChefResponse } from "../components/ShowMap";
import { AddressByZipCodeType } from "../types/AddressByZipCodeType";
import { AddressResponseType } from "../types/AddressResponseType";
import { CategoriesResponseType } from "../types/CategoriesResponseType";
import { CategoryType } from "../types/CategoryType";
import { ChefsResponseType } from "../types/ChefsResponseType";
import { CitiesResponseType } from "../types/CitiesResponseType";
import { CityType } from "../types/CityType";
import { ClientsAddressResponseType } from "../types/ClientsAddressResponseType";
import { DishType } from "../types/DishType";
import { DishesResponseType } from "../types/DishesResponseType";
import { OrderItemResponseType } from "../types/OrderItemResponseType";
import { OrderResponseType } from "../types/OrderResponseType";
import { OrdersResponseType } from "../types/OrdersResponseType";
import { StateType } from "../types/StateType";
import { StateResponseType } from "../types/StatesResponseType";
import { TelephoneType } from "../types/TelephoneType";
import { TelephonesResponseType } from "../types/TelephonesResponseType";
import { UserResponseType } from "../types/UserResponseType";
import { api } from "./api";

export const getCategories = async () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<CategoriesResponseType>("/categories", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getCategory = async (id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<CategoryType>(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getStates = async () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<StateResponseType>("/states", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getState = async (id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<StateType>(`/states/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getCities = async (state_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<CitiesResponseType>(
        `/states/${state_id}/cities`,
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

export const getCity = async (state_id: string, city_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<CityType>(
        `/states/${state_id}/cities/${city_id}`,
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
export const getAddressByZipCode = async (zip_code: string) => {
  try {
    const response = await api.get<AddressByZipCodeType>(
      `/addresses/search_zip_code/${zip_code}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getClientsAddress = async () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<ClientsAddressResponseType>(
        "/clients/addresses",
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

export const getChefs = async () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<IChefResponse[]>("/chefs", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getChef = async (chef_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<UserResponseType>(`/chefs/${chef_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getChefAddress = async (chef_id: string, address_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<AddressResponseType>(
        `/chefs/${chef_id}/addresses/${address_id}`,
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

export const getMe = async () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<UserResponseType>("/clients/me", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getOrders = async () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<OrdersResponseType>("/clients/orders", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getOrder = async (order_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<OrderResponseType>(
        `/clients/orders/${order_id}`,
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

//TODO verificar se é essa tipagem mesmo
export const getChefOrders = async (chef_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<OrdersResponseType>(
        `/chefs/${chef_id}/orders`,
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

//TODO Testar de novo, deu erro interno

export const getChefOrder = async (chef_id: string, order_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<OrdersResponseType>(
        `/chefs/${chef_id}/orders/${order_id}`,
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

export const getOrderItems = async (order_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<OrderItemResponseType[]>(
        `/clients/orders/${order_id}/order_items`,
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

export const getOrderItem = async (order_id: string, orderItem_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<OrderItemResponseType>(
        `/clients/orders/${order_id}/order_items/${orderItem_id}`,
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

export const getClientTelephones = async () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<TelephonesResponseType>(
        "/clients/telephones",
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

export const getClientTelephone = async (telephone_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<TelephoneType>(
        `/clients/telephones/${telephone_id}`,
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

export const getChefTelephones = async (chef_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<TelephonesResponseType>(
        `/chefs/${chef_id}/telephones`,
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

export const getChefTelephone = async (
  chef_id: string,
  telephone_id: string
) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<TelephoneType>(
        `/chefs/${chef_id}/telephones/${telephone_id}`,
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

export const getDishes = async () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<DishesResponseType>("/dishes", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getDish = async (dish_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<DishType>(`/dishes/${dish_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getChefDishes = async (chef_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<DishesResponseType>(
        `/chefs/${chef_id}/dishes`,
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

export const getChefDish = async (chef_id: string, dish_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.get<DishType>(
        `/chefs/${chef_id}/dishes/${dish_id}`,
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
