export type AddressByZipCodeType = {
    cep: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    service: string,
    location: {
        type: string,
        coordinates: {
            longitude: string,
            latitude: string
        }
    },
   city_id: string
}