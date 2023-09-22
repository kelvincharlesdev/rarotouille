import { api } from "./api";

export const cancelOrder = async (order_id: string) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token)
      try {
        const response = await api.patch(`/clients/orders/${order_id}/cancel`,{},{
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        return response;
      } catch (error) {
        console.log(error);
      }
};

export const checkoutOrder = async (order_id: string) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token)
      try {
        const response = await api.patch(`/clients/orders/${order_id}/checkout`,{},{
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        return response;
      } catch (error) {
        console.log(error);
      }
};

export const payOrder = async (order_id: string) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token)
      try {
        const response = await api.patch(`/clients/orders/${order_id}/pay`,{},{
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        return response;
      } catch (error) {
        console.log(error);
      }
};
