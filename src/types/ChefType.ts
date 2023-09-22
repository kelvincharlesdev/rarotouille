//TODO ver se isso pode
export type ChefType = {

        id: string,
        name: string,
        email: string,
        created_at: string,
        updated_at: string,
        address?: {
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
        telephones?: [
            {
                id: string,
                number: string,
                contactable_type: string,
                contactable_id: string,
                created_at: string,
                updated_at: string
            },
        ]
    
}