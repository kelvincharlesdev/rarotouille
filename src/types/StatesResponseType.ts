import { MetaType } from "./MetaType"
import { StateType } from "./StateType"

export type StateResponseType = {
    data: StateType[],
    meta: MetaType
}