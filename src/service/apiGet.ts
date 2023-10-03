import { IChefResponse } from "../components/ShowMap";
import { AddressByZipCodeType } from "../types/AddressByZipCodeType";
import { AddressResponseType } from "../types/AddressResponseType";
import { CategoriesResponseType } from "../types/CategoriesResponseType";
import { CategoryType } from "../types/CategoryType";
import { CitiesResponseType } from "../types/CitiesResponseType";
import { CityType } from "../types/CityType";
import { ClientsAddressResponseType } from "../types/ClientsAddressResponseType";
import { DishType } from "../types/DishType";
import { DishesResponsePaginated } from "../types/DishesResponsePaginated";
import { DishesResponseType } from "../types/DishesResponseType";
import { OrderItemResponseType } from "../types/OrderItemResponseType";
import { OrderResponseType } from "../types/OrderResponseType";
import { OrdersResponseType } from "../types/OrdersResponseType";
import { RatingType } from "../types/RatingType";
import { StateType } from "../types/StateType";
import { StateResponseType } from "../types/StatesResponseType";
import { TelephoneType } from "../types/TelephoneType";
import { TelephonesResponseType } from "../types/TelephonesResponseType";
import { UserResponseType } from "../types/UserResponseType";
import { api } from "./api";

export const getCategories = async () => {
    try {
      const response = await api.get<CategoriesResponseType>("/categories");
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getCategory = async (id: string) => {
    try {
      const response = await api.get<CategoryType>(`/categories/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getStates = async () => {
    try {
      const response = await api.get<StateResponseType>("/states");
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getState = async (id: string) => {
    try {
      const response = await api.get<StateType>(`/states/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getCities = async (state_id: string) => {
    try {
      const response = await api.get<CitiesResponseType>(
        `/states/${state_id}/cities`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getCity = async (state_id: string, city_id: string) => {
    try {
      const response = await api.get<CityType>(
        `/states/${state_id}/cities/${city_id}`
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
    try {
      const response = await api.get<ClientsAddressResponseType>(
        "/clients/addresses"
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getChefs = async () => {
    try {
      const response = await api.get<IChefResponse[]>("/chefs");
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getChef = async (chef_id: string) => {
    try {
      const response = await api.get<IChefResponse>(`/chefs/${chef_id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getChefAddress = async (chef_id: string, address_id: string) => {
    try {
      const response = await api.get<AddressResponseType>(
        `/chefs/${chef_id}/addresses/${address_id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getMe = async () => {
    try {
      const response = await api.get<UserResponseType>("/clients/me");
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getOrders = async () => {
    try {
      const response = await api.get<OrdersResponseType>("/clients/orders");
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getOrder = async (order_id: string) => {
    try {
      const response = await api.get<OrderResponseType>(
        `/clients/orders/${order_id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

//TODO verificar se é essa tipagem mesmo
export const getChefOrders = async (chef_id: string) => {
    try {
      const response = await api.get<OrdersResponseType>(
        `/chefs/${chef_id}/orders`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

//TODO Testar de novo, deu erro interno

export const getChefOrder = async (chef_id: string, order_id: string) => {
    try {
      const response = await api.get<OrdersResponseType>(
        `/chefs/${chef_id}/orders/${order_id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getOrderItems = async (order_id: string) => {
    try {
      const response = await api.get<OrderItemResponseType[]>(
        `/clients/orders/${order_id}/order_items`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getOrderItem = async (order_id: string, orderItem_id: string) => {
    try {
      const response = await api.get<OrderItemResponseType>(
        `/clients/orders/${order_id}/order_items/${orderItem_id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getClientTelephones = async () => {
    try {
      const response = await api.get<TelephonesResponseType>(
        "/clients/telephones"
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getClientTelephone = async (telephone_id: string) => {
    try {
      const response = await api.get<TelephoneType>(
        `/clients/telephones/${telephone_id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getChefTelephones = async (chef_id: string) => {
    try {
      const response = await api.get<TelephonesResponseType>(
        `/chefs/${chef_id}/telephones`
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
    try {
      const response = await api.get<TelephoneType>(
        `/chefs/${chef_id}/telephones/${telephone_id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getDishes = async () => {
    try {
      const response = await api.get<DishesResponseType>("/dishes");
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getDishesPaginated = async ({
  page,
  per_page
}: DishesResponsePaginated) => {
    try {
      const response = await api.get<DishesResponseType>("/dishes", {
        params: {
          page,
          per_page
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getDish = async (dish_id: string) => {
    try {
      const response = await api.get<DishType>(`/dishes/${dish_id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getChefDishes = async (chef_id: string) => {
    try {
      const response = await api.get<DishesResponseType>(
        `/chefs/${chef_id}/dishes`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getChefDish = async (chef_id: string, dish_id: string) => {
    try {
      const response = await api.get<DishType>(
        `/chefs/${chef_id}/dishes/${dish_id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const getRatings = async (dish_id: string) => {
    try {
      const response = await api.get<RatingType>(
        `/dishes/${dish_id}/ratings`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};