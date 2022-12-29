import express from 'express'; //importamos express
import dotenv from 'dotenv'; //importamos dotenv para variables de entorno
import conectarDB from './config/db.js'; //importamos la conexion
import clienteRoutes from './routes/clienteRoutes.js'; //importamos las rutas 
import libroRoutes from './routes/libroRoutes.js'; //importamos las rutas de libro
import cors from 'cors';
const app = express(); //mandamos a llamar express con app
app.use(express.json());
app.use(cors({origin: '*'}));
const port = process.env.PORT || 4000; //indicamos el puerto donde correra
dotenv.config(); //le decimos a express donde buscar la conexion
conectarDB();

app.use('/api/clientes', clienteRoutes);
app.use('/api/libros', libroRoutes);


app.listen(port, () => {
    console.log(`App working on port ${port}`)
})