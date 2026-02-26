import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './database';
import authRoutes from './routes/authRoutes';
import workoutRoutes from './routes/workoutRoutes';
import workoutLogRoutes from './routes/workoutLogRoutes';

dotenv.config();

connectDB();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('API TypeScript GymApp Rodando 🚀');
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/workout-logs', workoutLogRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
