// src/app.ts
import express from 'express';
import 'express-async-errors';
import router from './routes/UserRoutes';
import cors from 'cors'
import { errorMiddleware } from './middlewares/error';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analisar JSON
app.use(express.json());

// Habilita CORS para todas as requisições
app.use(cors());

// Rotas da API
app.use('/api', router);

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
