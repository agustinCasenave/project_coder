import express from 'express';
import productRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import { ProductManager } from "./manager/products.manager.js"
const productManager = new ProductManager(`${__dirname}/db/products.json`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');  

app.use('/', viewsRouter);

app.use('/api/products',productRouter)
app.use('/api/carts',cartsRouter)

const PORT = 8080;
const httpServer = app.listen(PORT, ()=>console.log(`Server ok on port ${PORT}`))


const socketServer = new Server(httpServer);

socketServer.on('connection', async(socket)=>{
    console.log('🟢 ¡New connection!', socket.id);
    
    socketServer.emit('newConnection', await productManager.getProducts());
    
    socket.on('disconnect', ()=>{
        console.log('🔴 User disconnect', socket.id);
    })

    socket.on('newProductFront', async (productNew)=>{
        try{
            let title = productNew.title
            let description = productNew.description
            let price = productNew.price
            let thumbnails = productNew.thumbnails
            let code = productNew.code
            let stock = productNew.stock
            let category = productNew.category
            console.log(productNew)
            const product = await productManager.createProduct(title, description, code, price, stock, category, thumbnails )
            if (product)
                socketServer.emit("newProduct", product);
        } catch (error) {
            console.log(error);
        }
    })
});

socketServer.on('newProductFront', (productNew)=>{
    try{
        let title = productNew.title
        let description = productNew.description
        let price = productNew.price
        let thumbnails = productNew.thumbnails
        let code = productNew.code
        let stock = productNew.stock
        let category = productNew.category
        console.log(productNew)
        // const product = await productManager.createProduct(title, description, code, price, stock, category, thumbnails )
        if (product)
            socketServer.emit("newProduct", product);
    } catch (error) {
        console.log(error);
    }
})

export { socketServer };