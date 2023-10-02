import { CheckoutResponseType } from "../types/CheckoutResponseType";
import { api } from "./api";

export const cancelOrder = async (order_id: string) => {
    try {
      const response = await api.patch(
        `/clients/orders/${order_id}/cancel`,
        {}
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const checkoutOrder = async (order_id: string) => {
    try {
      const response = await api.patch<CheckoutResponseType>(
        `/clients/orders/${order_id}/checkout`,
        {}
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const payOrder = async (order_id: string) => {
    try {
      const response = await api.patch(
        `/clients/orders/${order_id}/pay`,
        {}
      );
      return response;
    } catch (error) {
      console.log(error);
    }
};
