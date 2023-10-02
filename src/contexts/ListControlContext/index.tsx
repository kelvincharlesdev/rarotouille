import React, { createContext, useContext, useEffect, useState } from "react";
import { DishType } from "../../types/DishType";
import { TelephoneType } from "../../types/TelephoneType";
import { AddressResponseType } from "../../types/AddressResponseType";
import { getClientTelephones, getClientsAddress, getDishes } from "../../service/apiGet";
import { useAuthContext } from "../AuthContext";

export interface ListControlContextProps {
  favoritesDishes: DishType[];
  setFavoritesDishes: (favoritesDishes: DishType[]) => void;
  userTelephones: TelephoneType[];
  setUserTelephones: (userTelephones: TelephoneType[]) => void;
  userAddresses: AddressResponseType[];
  setUserAddresses:(userAddresses: AddressResponseType[]) => void;
  addFavorite: (dish: DishType) => void;
  removeFavorite: (dish_id: string) => void;
  addPhone: (phone: TelephoneType) => void;
  removePhone : (phone_id: string) => void;
  addAddress: (address: AddressResponseType) => void;
  removeAddress: (address_id: string) => void;
  updatePhone: (phone_id: string, updatePhone: TelephoneType) => void;
  updateAddresses: (address_id: string, updateAddress: AddressResponseType) => void;
  addressIndex: number;
  setAddressIndex: (addressIndex: number) => void;
  switchAddressIndex: (index: number) => void;
}

export const ListControlContext = createContext({} as ListControlContextProps);

interface ListControlProvider {
  children: React.ReactNode;
}

export const ListControlProvider = ({ children }: ListControlProvider) => {
    const [favoritesDishes, setFavoritesDishes] = useState<DishType[]>([]);
    const [userTelephones, setUserTelephones] = useState<TelephoneType[]>([]);
    const [userAddresses, setUserAddresses] = useState<AddressResponseType[]>([]);
    const [addressIndex, setAddressIndex] = useState(0);

    const {user} = useAuthContext();


  const addFavorite =  (dish: DishType) => {
    const copyFavorites = [...favoritesDishes];
    setFavoritesDishes([...copyFavorites, dish]);
  };

  const removeFavorite =  (dish_id: string) => {
    const copyFavorites = [...favoritesDishes];
    const filteredDishes = copyFavorites.filter(
        dish => dish.id !== dish_id
      );
      setFavoritesDishes(filteredDishes);
  };

  const addPhone =  (phone: TelephoneType) => {
    const copyPhones = [...userTelephones];
    setUserTelephones([...copyPhones, phone]);
  };

  const removePhone = (phone_id: string) => {
    const copyPhones = [...userTelephones];
    const filteredPhones = copyPhones.filter(
        phone => phone.id !== phone_id
      );
      setUserTelephones(filteredPhones);
  };

  const addAddress =  (address: AddressResponseType) => {
    const copyAddress = [...userAddresses];
    setUserAddresses([...copyAddress, address]);
  };

  const removeAddress = (address_id: string) => {
    const copyAddress = [...userAddresses];
    const filteredAddresses = copyAddress.filter(
        address => address.id !== address_id
      );
      setUserAddresses(filteredAddresses);
  };


  const getFavoritesDishesList = async () => {
    const response = await getDishes();
    if (response) {
        const copyFavorites = response.data.data.filter((dish)=> verifyLike(dish));
      setFavoritesDishes(copyFavorites);
    }
  };

  const verifyLike = (dish: DishType) => {
    const verify = dish.likes?.find((like)=> like.voter_id === user?.id);
    if(verify){
      return true;
    }else{
      return false;
    } 
  }

  const getUserPhones = async () => {
    const response = await getClientTelephones();
    if(response){
        setUserTelephones(response.data.data);
    }
  }

  const getUserAddresses = async () => {
    const response = await getClientsAddress();
    if(response){
        setUserAddresses(response.data.data);
    }
  }

  const updatePhone = (phone_id: string, updatePhone: TelephoneType) => {
    const copyPhones = [...userTelephones];
    const newPhones = copyPhones.map((phone)=>{
        if(phone.id === phone_id){
            phone = updatePhone
        }
        return phone;
    })
    setUserTelephones(newPhones);
  }

  const updateAddresses = (address_id: string, updateAddress: AddressResponseType) => {
    const copyAddresses = [...userAddresses];
    const newAddresses = copyAddresses.map((address)=>{
        if(address.id === address_id){
            address = updateAddress
        }
        return address;
    })
    setUserAddresses(newAddresses);
  }

  const switchAddressIndex = (index: number) =>{
    setAddressIndex(index);
  }

  useEffect(()=>{
    if(favoritesDishes.length === 0 && user){
        getFavoritesDishesList();    
    }
    if(userTelephones.length === 0 && user){
        getUserPhones();
    }
    if(userAddresses.length === 0 && user){
        getUserAddresses();
    }
  },[user])



  return (
    <ListControlContext.Provider
      value={{
        favoritesDishes,
        setFavoritesDishes,
        userTelephones,
        setUserTelephones,
        userAddresses,
        setUserAddresses,
        addFavorite,
        removeFavorite,
        addPhone,
        removePhone,
        addAddress,
        removeAddress,
        updatePhone,
        updateAddresses,
        addressIndex,
        setAddressIndex,
        switchAddressIndex
      }}
    >
      {children}
    </ListControlContext.Provider>
  );
};

export const useListControlContext = () => {
  const context = useContext(ListControlContext);

  if (context === undefined) {
    throw new Error("Fora do ListControl");
  }

  return context;
};