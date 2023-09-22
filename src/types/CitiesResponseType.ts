import { CityType } from "./CityType"
import { MetaType } from "./MetaType"

export type CitiesResponseType = {
    data: CityType[],
    meta: MetaType
}