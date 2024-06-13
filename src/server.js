import express from 'express';
import { initMongoDB } from './daos/mongodb/connection.js';
import { errorHandler } from './middlewares/errorHandler.js';
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)

app.use(errorHandler);

initMongoDB();

const PORT = 8080;
const httpServer = app.listen(PORT, ()=>console.log(`Server ok on port ${PORT}`))