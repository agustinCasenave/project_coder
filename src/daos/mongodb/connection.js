import { connect } from 'mongoose';

const connectionString = 'mongodb+srv://admin:K7hODN3tyVEL4U1n@cluster0.zmavr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

export const initMongoDB = async () => {
    try {
        await connect(connectionString);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.log(`ERROR => ${error}`);
    }
}