import { api } from "./api";

export const logout = async () => {
  const access_token = localStorage.getItem("access_token");

  if (access_token)
    try {
      const response = await api.delete("/sessions/logout", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const deleteAddress = async (address_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.delete(`/clients/addresses/${address_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

export const deleteOrderItem = async (
  order_id: string,
  orderItem_id: string
) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.delete(
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

export const deleteClientTelephone = async (telephone_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.delete(`/clients/telephones/${telephone_id}`, {
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
export const deleteChefTelephone = async (
  chef_id: string,
  telephone_id: string
) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.delete(
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

//TODO ver se é necessário
export const deleteChefDish = async (chef_id: string, dish_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.delete(`/chefs/${chef_id}/dishes/${dish_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};

//TODO testar depois pq não tá funcionando
export const desLike = async (like_id: string) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token)
    try {
      const response = await api.delete(`/likes/${like_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};
