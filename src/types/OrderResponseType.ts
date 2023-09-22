//TODO Trocar os objects pelos tipos, item, dishs

export type OrderResponseType = {
    id: string,
    client_id: string,
    delivery_address_id: string,
    total_price: string,
    status: string,
    created_at: string,
    updated_at: string,
    delivery_address: {
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
    items: [
        {
            id: string,
            order_id: string,
            dish_id: string,
            amount: number,
            unit_price: string,
            created_at: string,
            updated_at: string,
            dish: {
                id: string,
                chef_id: string,
                name: string,
                description: string,
                available: boolean,
                active: boolean,
                unit_price: string,
                created_at: string,
                updated_at: string
            }
        }
    ]
}