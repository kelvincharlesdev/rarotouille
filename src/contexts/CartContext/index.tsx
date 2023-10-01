import { createContext, useContext, useEffect, useState } from "react";
import { DishType } from "../../types/DishType";
import { OrderItemType } from "../../types/OrderItemType";
import { getMe } from "../../service/apiGet";
import { AddressResponseType } from "../../types/AddressResponseType";
import { postOrder } from "../../service/apiPosts";
import { AxiosResponse } from "axios";
import { OrderResponseType } from "../../types/OrderResponseType";
import { checkoutOrder, payOrder } from "../../service/apiPatchs";
import { PaymentOptionType } from "../../types/PaymentOptionType";
import { CartOrderType } from "../../types/CartOrderType";
import { useAuthContext } from "../AuthContext";

interface CartContextProps {
  cartOrders: CartOrderType[];
  setCartOrders: (cartOrders: CartOrderType[]) => void;
  userAddresses: AddressResponseType[];
  setUserAddresses: (userAddresses: AddressResponseType[]) => void;
  finalOrder: OrderResponseType;
  setFinalOrder: (finalOrder: OrderResponseType) => void;
  totalPrice: number;
  setTotalPrice: (totalPrice: number) => void;
  chefsNames: string[];
  setChefsNames: (chefs: string[]) => void;
  paymentLink: string;
  setPaymentLink: (paymentLink: string) => void;
  deliveryAddressIndex: number;
  setDeliveryAddressIndex: (deliveryAddressIndex: number) => void;
  switchDeliveryAddress: (index: string) => void;
  paymentOptions: PaymentOptionType[];
  setPaymentOptions: (paymentOptions: PaymentOptionType[]) => void;
  paymentOptionIndex: number;
  setPaymentOptionIndex: (paymentOptionIndex: number) => void;
  switchPaymentOption: (index: string) => void;
  addDishToCart: (dish: DishType) => void;
  removeDishToCart: (dish_id: string) => void;
  removeOrderLine: (order: CartOrderType) => void;
  removeAllDishesToCart: () => void;
  finishOrder: () => Promise<AxiosResponse<OrderResponseType, any> | null>;
  payFinalOrder: () => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}
export const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: CartProviderProps) => {
  //TODO zerar esses states
  const [cartOrders, setCartOrders] = useState<CartOrderType[]>([]);
  //TODO trocar nome
  const [chefsNames, setChefsNames] = useState<string[]>([]);
  const [userAddresses, setUserAddresses] = useState<AddressResponseType[]>([]);
  const [finalOrder, setFinalOrder] = useState<OrderResponseType>(
    {} as OrderResponseType
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentLink, setPaymentLink] = useState("");
  const [deliveryAddressIndex, setDeliveryAddressIndex] = useState(0);
  const [paymentOptions, setPaymentOptions] = useState<PaymentOptionType[]>([
    {
      name: "Qr code",
      description: "Pagamento via Qr code"
    },
    {
      name: "Link",
      description: "Pagamento via link"
    }
  ]);
  const [paymentOptionIndex, setPaymentOptionIndex] = useState(0);
  const {user} = useAuthContext();

  const getUserAddress = () =>{
    if(user){
      setUserAddresses(user.addresses);
    }
  }

  useEffect(() => {
    getUserAddress();
  }, [user]);

  const getChefsName = (dishes: CartOrderType[]) => {
    const chefs = dishes.map(dish => {
      return dish.dish.chef?.name;
    });
    const chefsUnique = chefs.filter((chef, index) => {
      return chefs.indexOf(chef) === index;
    });
    setChefsNames(chefsUnique);
  };

  const addDishToCart = async (dish: DishType) => {
    const copyCartOrders = [...cartOrders];
    const orderItem = copyCartOrders.find(
      orderItem => orderItem.dish.id === dish.id
    );
    if (!orderItem) {
      copyCartOrders.push({
        amount: 1,
        dish: dish
      });
    } else {
      orderItem.amount += 1;
    }
    if (cartOrders.length === 0) {
      setTotalPrice(Number(dish.unit_price));
    } else {
      setTotalPrice(prev => prev + Number(dish.unit_price));
    }
    setCartOrders(copyCartOrders);
    getChefsName(copyCartOrders);
  };

  const removeDishToCart = async (dish_id: string) => {
    const copyCartOrders = [...cartOrders];
    const orderItem = copyCartOrders.find(
      orderItem => orderItem.dish.id === dish_id
    );
    if (orderItem && orderItem?.amount > 1) {
      orderItem.amount -= 1;
      setCartOrders(copyCartOrders);
    } else {
      const filterOrders = copyCartOrders.filter(
        orderItem => orderItem.dish.id !== dish_id
      );
      setCartOrders(filterOrders);
      getChefsName(filterOrders);
    }
    setTotalPrice(prev => prev - Number(orderItem?.dish.unit_price));
  };

  const removeOrderLine = (order: CartOrderType) => {
    const copyOrderItems = [...cartOrders];
    const filterOrders = copyOrderItems.filter(
      orderItem => orderItem.dish.id !== order.dish.id
    );
    setTotalPrice(prev => prev - Number(order.dish.unit_price) * order.amount);
    setCartOrders(filterOrders);
    getChefsName(filterOrders);
  };

  const removeAllDishesToCart = () => {
    setCartOrders([]);
    setTotalPrice(0);
    setChefsNames([]);
    setFinalOrder({} as OrderResponseType);
  };

  const finishOrder = async () => {
    const copyCartOrders = [...cartOrders];
    const orderItems = copyCartOrders.map(order => {
      const orderItem: OrderItemType = {
        amount: order.amount,
        dish_id: order.dish.id
      };
      return orderItem;
    });
    const res = await postOrder({
      delivery_address_id: userAddresses[deliveryAddressIndex].id,
      items_attributes: orderItems
    });
    if (res?.status === 201) {
      setFinalOrder(res.data);
      if (res.data.id) {
        const response = await checkoutOrder(res.data.id);
        if (response) {
          setPaymentLink(response.data.payment_link);
          return res;
        }
      }
    }
    return null;
  };

  const payFinalOrder = async () => {
    await payOrder(finalOrder.id);
  };

  const switchDeliveryAddress = (index: string) => {
    const aux = Number(index);
    setDeliveryAddressIndex(aux);
  };

  const switchPaymentOption = (index: string) => {
    const aux = Number(index);
    setPaymentOptionIndex(aux);
  };

  return (
    <CartContext.Provider
      value={{
        cartOrders,
        setCartOrders,
        chefsNames,
        setChefsNames,
        userAddresses,
        setUserAddresses,
        finalOrder,
        setFinalOrder,
        totalPrice,
        setTotalPrice,
        paymentLink,
        setPaymentLink,
        deliveryAddressIndex,
        setDeliveryAddressIndex,
        switchDeliveryAddress,
        paymentOptions,
        setPaymentOptions,
        paymentOptionIndex,
        setPaymentOptionIndex,
        switchPaymentOption,
        addDishToCart,
        removeDishToCart,
        removeAllDishesToCart,
        removeOrderLine,
        finishOrder,
        payFinalOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("Fora do CartProvider");
  }

  return context;
};
