import mongoose from "mongoose"; //importamos mongoose que nos ayuda con mongDB requests
mongoose.set('strictQuery', true); //suprimir deprecated warming
const conectarDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log('DB conected at ', url);
    } catch (error) {
        console.log(`${error.message}`);
        process.exit(1);
    }
}

export default conectarDB;