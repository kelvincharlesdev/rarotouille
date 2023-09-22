//TODO corrigir depois a tipagem do address e telephoes

export type ClientType = {

        name: string,
        email: string,
        telephones_attributes: [
          {
            id: string,
            number: string,
          }
        ],
        addresses_attributes: [
          {
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
        city_id: string,}
        ]
      
}