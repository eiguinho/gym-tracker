import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exercise from '../models/Exercise';
import WorkoutTemplate from '../models/WorkoutTemplate';
import { getInicianteTemplates } from './data/iniciante';
import { getIntermediarioTemplates } from './data/intermediario';
import { getAvancadoTemplates } from './data/avancado';

dotenv.config();

const seedTemplates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Conectado ao MongoDB para Seed...');

    const exercisesInDB = await Exercise.find({});
    const exMap = exercisesInDB.reduce((acc, curr) => {
      acc[curr.name] = curr._id;
      return acc;
    }, {} as Record<string, mongoose.Types.ObjectId>);

    const getExId = (name: string) => {
      if (!exMap[name]) throw new Error(`Exercício não encontrado: "${name}"`);
      return exMap[name];
    };

    const allTemplates = [
      ...getInicianteTemplates(getExId),
      ...getIntermediarioTemplates(getExId),
      ...getAvancadoTemplates(getExId),
    ];

    await WorkoutTemplate.deleteMany({});
    console.log('Antigos templates removidos.');

    await WorkoutTemplate.insertMany(allTemplates);
    
    console.log(`Sucesso! ${allTemplates.length} programas inseridos.`);
    process.exit(0);

  } catch (error) {
    console.error('Erro no Seed:', error);
    process.exit(1);
  }
};

seedTemplates();