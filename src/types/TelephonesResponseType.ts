import { MetaType } from "./MetaType"
import { TelephoneType } from "./TelephoneType"

export type TelephonesResponseType = {
    data: TelephoneType[],
    meta: MetaType
}