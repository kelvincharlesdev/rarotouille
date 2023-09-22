export type OrderPostType = {
        delivery_address_id: string,
        items_attributes: [
          {
            dish_id: string,
            amount: number
          }
        ]
}