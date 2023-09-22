import { MetaType } from "./MetaType"

export type ClientsAddressResponseType = {

        data: [
            {
                id: string,
                name: string,
                public_place: string,
                zip_code: string,
                number: string,
                neighborhood: string,
                reference: string
                complement: string
                latitude: number,
                longitude: number,
                city_id: string,
                addressable_type: string,
                addressable_id: string,
                created_at: string,
                updated_at: string
            }
        ],
       meta: MetaType
    
}