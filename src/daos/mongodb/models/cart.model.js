import { Schema, model } from "mongoose"

const cartSchema = new Schema({
    products: [{
        "id": String,
        "quantity": Number,
        "_id": String //Disable _id for array items
    }]
})

export const CartModel = model(
    "cart",
    cartSchema
)