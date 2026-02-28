import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const clearData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('✅ Conectado ao MongoDB...');

    // Limpa apenas os treinos e os registros do calendário
    // Os exercícios (Seed) continuam intactos!
    await mongoose.connection.db?.collection('workouts').deleteMany({});
    await mongoose.connection.db?.collection('workoutlogs').deleteMany({});

    console.log('🗑️ Treinos e Logs antigos removidos com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao limpar dados:', error);
    process.exit(1);
  }
};

clearData();