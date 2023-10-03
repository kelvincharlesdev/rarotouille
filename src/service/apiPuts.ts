import { AddresPostType } from "../types/AddressPostType";
import { DishPostType } from "../types/DishPostType";
import { OrderItemResponseType } from "../types/OrderItemResponseType";
import { ResetPasswordType } from "../types/ResetPasswordType";
import { TelephoneUpdateType } from "../types/TelephoneUpdateType";
import { ClientType } from "../types/ClientType";
import { api } from "./api";
import { RatingPostType } from "../types/RatingPostType";

export const resetPassword = async (values: ResetPasswordType) => {
  try {
    const response = await api.put("/passwords/reset", values);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateAddress = async (
  values: AddresPostType,
  address_id: string
) => {
    try {
      const response = await api.put(
        `/clients/addresses/${address_id}`,
        {
          address: values
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};


export const updateClient = async (values: ClientType) => {
    try {
      const response = await api.put(
        "/clients/update",
        {
          client: values
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const putOrderItem = async (
  order_id: string,
  orderItem_id: string,
  values: OrderItemResponseType
) => {
    try {
      const response = await api.put(
        `/clients/orders/${order_id}/order_items/${orderItem_id}`,
        {
          order_item: values
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const updateClientTelephone = async (
  telephone_id: string,
  phone_number: TelephoneUpdateType
) => {
    try {
      const response = await api.put(
        `/clients/telephones/${telephone_id}`,
        {
          telephone: phone_number
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const like = async (dish_id: string) => {
    try {
      const response = await api.put(`/dishes/${dish_id}/like`
,{}
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const desLike = async (dish_id: string) => {
    try {
      const response = await api.put(`/dishes/${dish_id}/dislike`,{});
      return response;
    } catch (error) {
      console.log(error);
    }
};


export const likeRating = async (dish_id: string, rating_id: string) => {
    try {
      const response = await api.put(`/dishes/${dish_id}/ratings/${rating_id}/like`
,{}
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const desLikeRating = async (dish_id: string, rating_id: string) => {
    try {
      const response = await api.put(`/dishes/${dish_id}/ratings/${rating_id}/dislike`,{});
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const updateRating = async (dish_id: string, rating_id: string, values: RatingPostType) => {
    try {
      const response = await api.put(`/dishes/${dish_id}/ratings/${rating_id}`,{
        rating: values
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};
