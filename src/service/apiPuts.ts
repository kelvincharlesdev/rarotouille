import { AddresPostType } from "../types/AddressPostType";
import { DishPostType } from "../types/DishPostType";
import { OrderItemResponseType } from "../types/OrderItemResponseType";
import { ResetPasswordType } from "../types/ResetPasswordType";
import { TelephoneType } from "../types/TelephoneType";
import { TelephoneUpdateType } from "../types/TelephoneUpdateType";
import { ClientType} from "../types/UpdateClientType";
import { api } from "./api";

export const resetPassword = async (values: ResetPasswordType) => {
  try {
    const response = await api.put("/passwords/reset", values);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateAddress = async (values: AddresPostType, address_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.put(`/clients/addresses/${address_id}`,{
        address: values,
      },{
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

// TODO Ver se precisa dessa cha mada tbm

export const updateChefAddress = async (values: AddresPostType, address_id: string, chef_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.put(`/chefs/${chef_id}/addresses/${address_id}`,{
        address: values,
      },{
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};
export const updateClient = async (values: ClientType) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.put("/clients/update",{
        client: values,
      },{
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const putOrderItem = async (order_id: string,  orderItem_id: string, values: OrderItemResponseType) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.put(`/clients/orders/${order_id}/order_items/${orderItem_id}`,{
        order_item: values
      },{
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const updateClientTelephone = async (telephone_id: string, phone_number: TelephoneUpdateType) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.put(`/clients/telephones/${telephone_id}`,{
        telephone: phone_number
      },{
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

//TODO ver se essa requisição é necessária
export const updateChefTelephone = async (chef_id: string, telephone_id: string, phone_number: TelephoneUpdateType) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.put(`/chefs/${chef_id}/telephones/${telephone_id}`,{
        telephone: phone_number
      },{
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

//TODO ver se é necessário
export const updateDish = async (chef_id: string,dish_id: string, dish: DishPostType) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.put(`/chefs/${chef_id}/dishes/${dish_id}`,{
        dish: dish
      },{
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};