import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './routes/products';
import aiRoutes from './routes/ai';
import errorHandler from './middlewares/error_handler';
import generateError from "./utils/generate_error";

const app = express();

const port = parseInt(process.env.PORT || '2000');
if (isNaN(port)) {
    throw new Error('PORT must be a valid number in .env');
}

const host = process.env.HOST || '0.0.0.0';

app.use(cors());
app.use(bodyParser.json());

// handle Routes
app.get('/', (req,res) => {
    res.send('Hello from Sogimoto Challenge API')
})
app.use('/products', productRoutes);
app.use('/AI', aiRoutes);

// handle middlewares
app.use(errorHandler);

app.listen(port, host, () => {
    console.log(`Server running on: http://${host}:${port}`);
});