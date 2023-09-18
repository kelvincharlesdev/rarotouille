export type SignUpPostType = {
  user: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    telephones_attributes: [
      {
        number: string;
      }
    ];
    addresses_attributes: [
      {
        name: string;
        public_place: string;
        zip_code: string;
        number: string;
        neighborhood: string;
        reference: string;
        complement: string;
        city_id: string;
        latitude: string;
        longitude: string;
      }
    ];
  };
};
