
const prod = (req,res,next) => {
    const body = req.body
    let title = body.title
    let description = body.description
    let price = body.price
    let code = body.code
    let stock = body.stock
    let category = body.category
    if(title && description && price && code && stock && category){
        console.log("next")
        next()
    } else {
        res.status(400).json({ msg: "Product db can't be null" });
    }
}

export const middleware_createProd = prod;