import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChef, getChefDishes, getChefs, getDish, getMe } from "../../service/apiGet";
import { DishType } from "../../types/DishType";
import { DishImage } from "../../components/DishImage";
import heartNoLiked from "../../assets/svgs/HeartNoLikedBig.svg";
import heartLiked from "../../assets/svgs/HeartLikedBig.svg";
import { MainBackground } from "../../components/MainBackground";
import styles from "./styles.module.css";
import { DishInfos } from "../../components/DishInfos";
import { DescriptionContent } from "../../components/DescriptionContent";
import { IChefResponse, ShowMap } from "../../components/ShowMap";
import { UserResponseType } from "../../types/UserResponseType";
import { Carousel } from "../../components/Carousel";
import { Rating } from "../../components/Rating";
import { AverageContent } from "../../components/AvaregeContent";
import { ButtonAddToCart } from "../../components/ButtonAddToCart";
import { useCartContext } from "../../contexts/CartContext";
import { SmallCard } from "../../components/SmallCard";
import { login } from "../../service/apiPosts";
import { RatingType } from "../../types/RatingType";

export const DishDetails = () => {
  const [dish, setDish] = useState<DishType>({} as DishType);
  const [user, setUser] = useState<UserResponseType>({} as UserResponseType);
  const [chefs, setChefs] = useState<IChefResponse[]>([]);
  const [dishRatings, setDishRatings] = useState<RatingType[]>([])
  const [chef, setChef] = useState<IChefResponse>({}as IChefResponse);
  const [otherChefDishes, setOtherChefDishes] = useState<DishType[]>([]);
  const [averageValue, setAverageValue] = useState(0);
  const {addDishToCart} = useCartContext();


  const { id } = useParams();
  const getDishIndividual = async() => {
    if(id){
      const res = await getDish(id)
      if(res){
        console.log(res.data)
        setDish(res.data)
      }
    }
    
  }

  const getUser = async() => {
    if(id){
      const res = await getMe()
      if(res)
      setUser(res.data)
    }
  }

  const getDishChef =async () => {
    if(dish.chef_id){
      const res = await getChef(dish.chef_id);
      if(res){
        setChef(res.data);
      }
    }
  }

  const getOtherChefDishes =async () => {
    if(dish.chef_id){
      const res = await getChefDishes(dish.chef_id);
      if(res){
       const copyOtherDishes = res.data.data.filter((dishChef)=> dishChef.id !== dish.id);
       console.log("otherDishes-------",dish)
       setOtherChefDishes(copyOtherDishes);
      }
    }
  }

  const getChefsToMap = async()=>{
    const res = await getChefs();
    if(res){
      setChefs(res?.data)
    }
  }

  const calculateAverageValue =async (dish: DishType) => {
    
    if(dish.ratings){
      const copyDish = dish.ratings;
      const rates = copyDish?.map((rating)=>{
        return rating.rate;
      }).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      if(rates && copyDish){
        const average = rates / copyDish?.length; 
        setAverageValue(average);
      }
    }

  }

 const dishExample =  {
    id: "0ba302a9-3917-441b-922c-eeddfe21c5da",
    chef_id: "fbaec5f9-97b2-464a-879c-fcf683a092d1",
    name: "Pãocovo",
    description: "É pão com ovo. O que você esperava? Nunca comeu um pão com ovo? SAI DO MEU RESTAURANTE!!!",
    available: true,
    active: true,
    unit_price: "19.9",
    created_at: "2023-09-25T21:20:58.524Z",
    updated_at: "2023-09-26T23:26:30.382Z",
    categories: [
        {
            "id": "cb2c8acc-a6ca-47c1-965e-ffd53904234b",
            "name": "Regional",
            "created_at": "2023-09-08T18:44:09.306Z",
            "updated_at": "2023-09-08T18:44:09.306Z"
        }
    ],
    images: [
        "http://academy-react.rarolabs.com.br/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyTnpSa1pHUmlOeTFpWm1KaUxUUXpPVEl0WVROaU5pMHhaV0prWVdWak5UWmxZemNHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--f00a1769d2c50e34d70a4703e5ddae3eb5820ca9/Screenshot%202023-09-25%20at%2018.19.43.png"
    ],
    ratings: [],
    chef: {
        "id": "fbaec5f9-97b2-464a-879c-fcf683a092d1",
        "name": "Gordon Ramsay",
        "email": "gordon@ramsay.com",
        "created_at": "2023-09-25T20:24:13.125Z",
        "updated_at": "2023-09-26T18:15:30.926Z"
    },
    liked_by_me: false,
    disliked_by_me: true,
    likes: [
        {
            "id": "643033f9-d023-4ddf-9cb9-f6750c5b8d2e",
            "votable_type": "Dish",
            "votable_id": "0ba302a9-3917-441b-922c-eeddfe21c5da",
            "voter_type": "User",
            "voter_id": "f6bb16a9-c612-4ab8-8db5-08dc3c25668f",
            "created_at": "2023-09-27T00:16:21.610Z",
            "updated_at": "2023-09-27T00:16:21.610Z"
        },
        {
            "id": "535e2e8c-b7ac-4acf-9082-14f767405e7d",
            "votable_type": "Dish",
            "votable_id": "0ba302a9-3917-441b-922c-eeddfe21c5da",
            "voter_type": "User",
            "voter_id": "c78fc1ae-f6ee-4e29-ba83-efe2c366f948",
            "created_at": "2023-09-27T02:00:37.923Z",
            "updated_at": "2023-09-27T20:03:36.054Z"
        }
    ],
    dislikes: [
        {
            "id": "de89c0f4-95e2-4545-bb3e-b69b1f8e891b",
            "votable_type": "Dish",
            "votable_id": "0ba302a9-3917-441b-922c-eeddfe21c5da",
            "voter_type": "User",
            "voter_id": "e2dfbd48-b0f2-4e3d-a5d3-a991fc0b5dde",
            "created_at": "2023-09-27T02:38:10.537Z",
            "updated_at": "2023-09-27T02:38:33.039Z"
        },
        {
            "id": "2d2ba4e9-4d14-4f65-969e-2d6385324326",
            "votable_type": "Dish",
            "votable_id": "0ba302a9-3917-441b-922c-eeddfe21c5da",
            "voter_type": "User",
            "voter_id": "6919679d-dc2f-48a9-ad20-64b9dbd61123",
            "created_at": "2023-09-27T01:54:02.127Z",
            "updated_at": "2023-09-27T01:54:33.541Z"
        }
    ]
}

  useEffect(()=>{
    console.log(id)
    login({
      email: "jv@teste.com",
      password: "jvNovaSenha"
    })
    getDishIndividual();
    getUser();
    getChefsToMap();
    getDishChef();
    getOtherChefDishes();
    calculateAverageValue(dish)
    console.log("dish --------", dish)
    console.log("chef -----------",chef)
  },[])

  //TODO Mari quando fizer o style do mainBackground, tem que ajustar o alinhamento da div infosAndDescriptionContent
  //TODO Pedir pro Kelvin explicar esse carrosel
  //TODO ver se é necessário esse "ver mais"
    return (
    <>
    <MainBackground>
      <div className={styles.mainContainer}>
        <div className={styles.infosAndDescriptionContent}>
          <div className={styles.imageAndDishInfosContent}>
            <DishImage imageUrl={dish.images[0]}/>
            <DishInfos dish={dish} average={averageValue} likeImage={heartLiked} noLikeImage={heartNoLiked}/>
            <ButtonAddToCart text="Adicionar ao carrinho" onClick={() => addDishToCart(dishExample)}/>
          </div>
          <DescriptionContent description={dishExample.description}/>
        </div>
        <div className={styles.mapContent}>
          <p className={styles.contentTitles}>Tão perto ...</p>
          {/* <ShowMap user={user} chefs={chefs}/> */}
        </div>
        <div className={styles.otherDishesContent}>
          <p className={styles.contentTitles}>Outros pratos do &#40;a&#41; chef {chef.name}</p>
          <div className={styles.carouselContent}>
          <Carousel>
            {otherChefDishes.map((otherChefDish)=>(
              <SmallCard dish={otherChefDish}/>
            ))}
          </Carousel>
          </div>
        </div>
        <div className={styles.ratingsAndAverageContent}>
        <div className={styles.ratingsContent}>
          <p className={styles.contentTitles}>Veja o que a galera está falando</p>
          {dishExample.ratings.length>0 ? (
            <>
              {dish.ratings.map((rating)=>(
                <Rating rating={rating}/>
              ))}
            </>
          ) : <p>Sem avaliações</p>}
        </div>
        <AverageContent average={averageValue}/>
        </div>
      </div>
    </MainBackground>
    </>
    );
};
