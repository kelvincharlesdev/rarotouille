import { TelephoneType } from "./TelephoneType"

//TODO ver se dá pra colocar esse tipo no lugar de ChefType
export type UserResponseType = {
    id: string,
        name: string,
        email: string,
        created_at: string,
        updated_at: string,
        address: {
            id: string,
            name: string,
            public_place: string,
            zip_code: string,
            number: string,
            neighborhood: string,
            reference: string,
            complement: string,
            latitude: number,
            longitude: number,
            city_id: string,
            addressable_type: string,
            addressable_id: string,
            created_at: string,
            updated_at: string
        },
        telephones: TelephoneType[],
}