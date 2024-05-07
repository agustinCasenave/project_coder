import express from 'express';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

app.listen(PORT, ()=>console.log(`Server ok on port ${PORT}`))