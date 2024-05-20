
const allowedFields = ['title', 'description', 'price', 'code','stock','category']; // Lista de campos permitidos

const prod = (req,res,next) => {
    const body = req.body
    for (let key in body) {
        if (!allowedFields.includes(key)) {
            return res.status(400).json({ msg: `Field ${key} is not allowed` });
        }
    }
    next()
}

export const middleware_updProd = prod;