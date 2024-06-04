import { Schema, model } from "mongoose";

const productSchema = new Schema({
    "title": {type: String, required: true, max: 30},
    "description": {type: String, required: true, max: 100},
    "code": {type: String, required: true, max: 10},
    "price": {type: Number, required: true},
    "status": {type: Boolean, required: true, default: true},
    "stock": {type: Number, required: true},
    "category": {type: String, required: true, max: 30},
    "thumbnails": [String]
})

export const ProductModel = model(
    "product",
    productSchema
)