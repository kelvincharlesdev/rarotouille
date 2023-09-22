//TODO ver de que é esse array depois

export type RatingType = {
  id: string;
  user_id: string;
  dish_id: string;
  rate: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user_name: string;
  likes: string[];
  dislikes: string[];
};
