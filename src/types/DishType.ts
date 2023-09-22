import { CategoryType } from "./CategoryType"
import { ChefType } from "./ChefType"
import { LikeType } from "./LikeType"
import { RatingType } from "./RatingType"

//TODO ver se esse like e deslike é a mesma coisa e se pode por como facultativo mesmo
export type DishType =
    {
        id: string,
        chef_id: string,
        name: string,
        description: string,
        available: boolean,
        active: boolean,
        unit_price: string,
        created_at: string,
        updated_at: string,
        categories: CategoryType[],
        images?: string[],
        ratings?: RatingType[],
        chef?:ChefType,
        liked_by_me?: boolean,
        disliked_by_me?: boolean,
        likes?: LikeType[],
        dislikes?: LikeType[]
    }