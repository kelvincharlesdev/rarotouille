import { CategoryType } from "./CategoryType"
import { MetaType } from "./MetaType"

export type CategoriesResponseType = {
    data: CategoryType[],
    meta: MetaType
}