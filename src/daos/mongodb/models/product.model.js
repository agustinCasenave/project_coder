import { Schema, model } from "mongoose";

const productSchema = new Schema({
    "title": {type: String, required: true, max: 30,index: true},
    "description": {type: String, required: true, max: 100},
    "code": {type: String, required: true, max: 10,index: true,unique: true},
    "price": {type: Number, required: true,index: true},
    "status": {type: Boolean, required: true, default: true},
    "stock": {type: Number, required: true},
    "category": {type: String, required: true, max: 30},
    "thumbnails": [String]
})

export const ProductModel = model(
    "product",
    productSchema
)