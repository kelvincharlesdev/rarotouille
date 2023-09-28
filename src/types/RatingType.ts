import { LikeType } from "./LikeType"

//TODO ver do que são esses arrays
export type RatingType ={
    id: string,
    user_id: string,
    dish_id: string,
    rate: number,
    comment: string,
    created_at: string,
    updated_at: string,
    likes: LikeType[],
    dislikes: LikeType[],
    user_name?:string
}