import 'dotenv/config'; 
import productsRoutes from './src/routes/productsRoutes.js';
import express from 'express';
import corsMiddleware from './src/middlewares/cors.js';
import authRouter from './src/routes/authRoutes.js';
import bodyParser from 'body-parser';

const app = express();
app.use(corsMiddleware());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.status(200).json({message: "Bienvenido a la API de productos"});
});
app.use('/api/', authRouter);
app.use('/api/products', productsRoutes);


app.use((req, res, next) => {
    res.status(404).json({ message: 'La ruta especificada no fue encontrada' });
});

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

