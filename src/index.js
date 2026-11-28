import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.routes.js'
import { connectDB } from './config/db.js';
import { successResponse } from './utils/responses.js';

dotenv.config();

const app =express();
const PORT = process.env.PORT || 3000;

app.use(cors());
//Middleware para interpretar JSON en req.doby
app.use(express.json());

//Ruta de prueba inicial
app.get('/',(req,res) => {
    return successResponse(
        res,
        200,
        null,
        'Servidor backend Express funcionando correctamente'
    );
});

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    connectDB();
});
