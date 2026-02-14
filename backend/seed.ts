import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exercise from './src/models/Exercise';
import connectDB from './src/database';

dotenv.config();
connectDB();

const exercises = [
  {
    name: 'Supino Reto com Barra',
    targetMuscles: ['Peito', 'Tríceps', 'Ombro'],
    equipment: 'Barra',
    difficulty: 'Intermediário',
  },
  {
    name: 'Supino Inclinado com Halteres',
    targetMuscles: ['Peito', 'Ombro'],
    equipment: 'Halter',
    difficulty: 'Intermediário',
  },
  {
    name: 'Crucifixo na Máquina (Peck Deck)',
    targetMuscles: ['Peito'],
    equipment: 'Máquina',
    difficulty: 'Iniciante',
  },
  {
    name: 'Agachamento Livre',
    targetMuscles: ['Pernas', 'Glúteos'],
    equipment: 'Barra',
    difficulty: 'Avançado',
  },
  {
    name: 'Puxada Alta',
    targetMuscles: ['Costas', 'Bíceps'],
    equipment: 'Máquina',
    difficulty: 'Iniciante',
  },
];

const seedData = async () => {
  try {
    await Exercise.deleteMany();
    await Exercise.insertMany(exercises);
    console.log('✅ Exercícios Padrão Inseridos!');
    process.exit();
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    process.exit(1);
  }
};

seedData();
