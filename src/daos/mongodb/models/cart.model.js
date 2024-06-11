import { Schema, model } from "mongoose"
import mongoosPaginate from "mongoose-paginate-v2"

const cartSchema = new Schema({
    products: [{
    product: {       
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: {
        type: Number,
        default: 1
    }
    }]
})


cartSchema.pre('findOne', function(){
    this.populate('products.product')
})

cartSchema.pre('findByIdAndUpdate', function(){
    this.populate('products.product')
})


export const CartModel = model(
    "cart",
    cartSchema
)