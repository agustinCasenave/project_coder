import { Schema, model } from "mongoose"

const cartSchema = new Schema({
    products: [String]
})

export const CartModel = model(
    "cart",
    cartSchema
)