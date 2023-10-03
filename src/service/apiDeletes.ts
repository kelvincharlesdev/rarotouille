import { api } from "./api";

export const logout = async () => {
    try {
      const response = await api.delete("/sessions/logout");
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const deleteAddress = async (address_id: string) => {
    try {
      const response = await api.delete(`/clients/addresses/${address_id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const deleteOrderItem = async (
  order_id: string,
  orderItem_id: string
) => {
    try {
      const response = await api.delete(
        `/clients/orders/${order_id}/order_items/${orderItem_id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const deleteClientTelephone = async (telephone_id: string) => {
    try {
      const response = await api.delete(`/clients/telephones/${telephone_id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
};

