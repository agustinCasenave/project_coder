import express from 'express';
import productRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products',productRouter)
app.use('/api/carts',cartsRouter)

const PORT = 8080;
app.listen(PORT, ()=>console.log(`Server ok on port ${PORT}`))