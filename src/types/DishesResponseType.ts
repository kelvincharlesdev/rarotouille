import { DishType } from "./DishType"
import { MetaType } from "./MetaType"

export type DishesResponseType = {
    data: DishType[],
    meta: MetaType
}