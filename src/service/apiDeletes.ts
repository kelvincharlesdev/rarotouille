import { api } from "./api";

export const logout = async () => {
    const access_token = localStorage.getItem("access_token");
    
    if(access_token)
    try {
      const response = await api.delete("/sessions/logout",{
        headers:{
            Authorization:`Bearer ${access_token}`
          }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};