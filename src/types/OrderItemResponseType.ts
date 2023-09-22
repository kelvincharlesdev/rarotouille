//TODO perguntar se isso tá certo

export type OrderItemResponseType = {
    id: string,
            order_id: string,
            dish_id: string,
            amount: number,
            unit_price: string,
            created_at: string,
            dish?: {
                active
: boolean
available
: 
boolean
chef_id
: 
string
created_at
: 
string
description
: 
string
id
: 
string
name
: 
string
unit_price
: 
string
updated_at
: 
string
            }
}