import express from 'express';
import { initMongoDB } from './daos/mongo/connection.js';
import { errorHandler } from './middlewares/errorHandler.js';
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import userRouter from './routes/user.routes.js'
import sessionRouter from './routes/session.routes.js'
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)
app.use('/api/users',userRouter)
app.use('/api/session',sessionRouter)

app.use(errorHandler);

initMongoDB();

const PORT = 8080;
const httpServer = app.listen(PORT, ()=>console.log(`Server ok on port ${PORT}`))