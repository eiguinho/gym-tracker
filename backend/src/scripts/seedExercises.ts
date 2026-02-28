import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exercise from '../models/Exercise';

dotenv.config();

const exercises = [
  // --- PEITO ---
  { name: 'Supino Reto com Barra', targetMuscles: ['Peito', 'Tríceps', 'Ombros'], equipment: 'Barra', difficulty: 'Intermediário' },
  { name: 'Supino Reto com Halteres', targetMuscles: ['Peito', 'Tríceps', 'Ombros'], equipment: 'Halter', difficulty: 'Intermediário' },
  { name: 'Supino Inclinado com Barra', targetMuscles: ['Peito', 'Ombros'], equipment: 'Barra', difficulty: 'Intermediário' },
  { name: 'Supino Inclinado com Halteres', targetMuscles: ['Peito', 'Ombros'], equipment: 'Halter', difficulty: 'Intermediário' },
  { name: 'Supino Declinado', targetMuscles: ['Peito', 'Tríceps'], equipment: 'Barra', difficulty: 'Avançado' },
  { name: 'Supino Máquina Articulada', targetMuscles: ['Peito', 'Tríceps'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Crucifixo Reto com Halteres', targetMuscles: ['Peito'], equipment: 'Halter', difficulty: 'Intermediário' },
  { name: 'Crucifixo Inclinado', targetMuscles: ['Peito'], equipment: 'Halter', difficulty: 'Intermediário' },
  { name: 'Crucifixo na Máquina (Peck Deck)', targetMuscles: ['Peito'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Crossover (Polia Alta)', targetMuscles: ['Peito'], equipment: 'Cabo', difficulty: 'Intermediário' },
  { name: 'Crossover (Polia Média)', targetMuscles: ['Peito'], equipment: 'Cabo', difficulty: 'Intermediário' },
  { name: 'Crossover (Polia Baixa)', targetMuscles: ['Peito'], equipment: 'Cabo', difficulty: 'Intermediário' },
  { name: 'Pullover', targetMuscles: ['Peito', 'Costas'], equipment: 'Halter', difficulty: 'Intermediário' },
  { name: 'Flexão de Braços', targetMuscles: ['Peito', 'Tríceps', 'Ombros'], equipment: 'Peso Corporal', difficulty: 'Iniciante' },

  // --- COSTAS ---
  { name: 'Puxada Frontal (Pulldown)', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Puxada com Triângulo', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Remada Curvada com Barra', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Barra', difficulty: 'Avançado' },
  { name: 'Remada Curvada Supinada', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Barra', difficulty: 'Avançado' },
  { name: 'Remada Baixa com Triângulo', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Cabo', difficulty: 'Intermediário' },
  { name: 'Remada Unilateral (Serrote)', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Halter', difficulty: 'Intermediário' },
  { name: 'Remada Cavalinho (T-Bar)', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Barra', difficulty: 'Intermediário' },
  { name: 'Remada Máquina Articulada', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Pull-down na Polia Alta', targetMuscles: ['Costas'], equipment: 'Cabo', difficulty: 'Intermediário' },
  { name: 'Barra Fixa (Pronada)', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Peso Corporal', difficulty: 'Avançado' },
  { name: 'Barra Fixa (Supinada)', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Peso Corporal', difficulty: 'Avançado' },
  { name: 'Levantamento Terra', targetMuscles: ['Costas', 'Pernas', 'Glúteos'], equipment: 'Barra', difficulty: 'Avançado' },

  // --- PERNAS & GLÚTEOS ---
  { name: 'Agachamento Livre', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Barra', difficulty: 'Avançado' },
  { name: 'Agachamento no Smith', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Máquina', difficulty: 'Intermediário' },
  { name: 'Agachamento Sumô', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Halter', difficulty: 'Intermediário' },
  { name: 'Agachamento Búlgaro', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Halter', difficulty: 'Avançado' },
  { name: 'Leg Press 45º', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Leg Press Horizontal', targetMuscles: ['Pernas'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Cadeira Extensora', targetMuscles: ['Pernas'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Mesa Flexora', targetMuscles: ['Pernas'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Cadeira Flexora', targetMuscles: ['Pernas'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Stiff com Barra', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Barra', difficulty: 'Intermediário' },
  { name: 'Stiff com Halteres', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Halter', difficulty: 'Intermediário' },
  { name: 'Elevação Pélvica', targetMuscles: ['Glúteos', 'Pernas'], equipment: 'Barra', difficulty: 'Intermediário' },
  { name: 'Cadeira Abdutora', targetMuscles: ['Glúteos'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Cadeira Adutora', targetMuscles: ['Pernas'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Passada / Avanço', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Halter', difficulty: 'Intermediário' },

  // --- PANTURRILHAS ---
  { name: 'Gêmeos Sentado', targetMuscles: ['Panturrilhas'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Gêmeos em Pé no Smith', targetMuscles: ['Panturrilhas'], equipment: 'Máquina', difficulty: 'Intermediário' },
  { name: 'Gêmeos no Leg Press', targetMuscles: ['Panturrilhas'], equipment: 'Máquina', difficulty: 'Intermediário' },

  // --- OMBROS & TRAPÉZIO ---
  { name: 'Desenvolvimento com Barra', targetMuscles: ['Ombros', 'Tríceps'], equipment: 'Barra', difficulty: 'Intermediário' },
  { name: 'Desenvolvimento com Halteres', targetMuscles: ['Ombros', 'Tríceps'], equipment: 'Halter', difficulty: 'Intermediário' },
  { name: 'Desenvolvimento Máquina', targetMuscles: ['Ombros', 'Tríceps'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Elevação Lateral com Halteres', targetMuscles: ['Ombros'], equipment: 'Halter', difficulty: 'Iniciante' },
  { name: 'Elevação Lateral na Polia', targetMuscles: ['Ombros'], equipment: 'Cabo', difficulty: 'Intermediário' },
  { name: 'Elevação Frontal com Halteres', targetMuscles: ['Ombros'], equipment: 'Halter', difficulty: 'Iniciante' },
  { name: 'Elevação Frontal na Polia', targetMuscles: ['Ombros'], equipment: 'Cabo', difficulty: 'Intermediário' },
  { name: 'Crucifixo Invertido (Peck Deck)', targetMuscles: ['Ombros', 'Costas'], equipment: 'Máquina', difficulty: 'Iniciante' },
  { name: 'Crucifixo Invertido com Halteres', targetMuscles: ['Ombros', 'Costas'], equipment: 'Halter', difficulty: 'Intermediário' },
  { name: 'Encolhimento com Halteres', targetMuscles: ['Trapézio'], equipment: 'Halter', difficulty: 'Iniciante' },
  { name: 'Encolhimento com Barra', targetMuscles: ['Trapézio'], equipment: 'Barra', difficulty: 'Intermediário' },

  // --- BÍCEPS & ANTEBRAÇO ---
  { name: 'Rosca Direta com Barra Reta', targetMuscles: ['Bíceps'], equipment: 'Barra', difficulty: 'Iniciante' },
  { name: 'Rosca Direta com Barra W', targetMuscles: ['Bíceps'], equipment: 'Barra', difficulty: 'Iniciante' },
  { name: 'Rosca Direta na Polia', targetMuscles: ['Bíceps'], equipment: 'Cabo', difficulty: 'Iniciante' },
  { name: 'Rosca Alternada com Halteres', targetMuscles: ['Bíceps'], equipment: 'Halter', difficulty: 'Iniciante' },
  { name: 'Rosca Martelo com Halteres', targetMuscles: ['Bíceps', 'Antebraço'], equipment: 'Halter', difficulty: 'Iniciante' },
  { name: 'Rosca Martelo na Polia (Corda)', targetMuscles: ['Bíceps', 'Antebraço'], equipment: 'Cabo', difficulty: 'Intermediário' },
  { name: 'Rosca Scott (Máquina/Barra)', targetMuscles: ['Bíceps'], equipment: 'Máquina', difficulty: 'Intermediário' },
  { name: 'Rosca Concentrada', targetMuscles: ['Bíceps'], equipment: 'Halter', difficulty: 'Intermediário' },
  { name: 'Rosca Inversa (Barra/Polia)', targetMuscles: ['Antebraço', 'Bíceps'], equipment: 'Barra', difficulty: 'Intermediário' },

  // --- TRÍCEPS ---
  { name: 'Tríceps Pulley (Barra Reta/V)', targetMuscles: ['Tríceps'], equipment: 'Cabo', difficulty: 'Iniciante' },
  { name: 'Tríceps Corda', targetMuscles: ['Tríceps'], equipment: 'Cabo', difficulty: 'Iniciante' },
  { name: 'Tríceps Testa com Barra W', targetMuscles: ['Tríceps'], equipment: 'Barra', difficulty: 'Intermediário' },
  { name: 'Tríceps Testa na Polia', targetMuscles: ['Tríceps'], equipment: 'Cabo', difficulty: 'Intermediário' },
  { name: 'Tríceps Francês (Halter Único)', targetMuscles: ['Tríceps'], equipment: 'Halter', difficulty: 'Intermediário' },
  { name: 'Tríceps Francês na Polia', targetMuscles: ['Tríceps'], equipment: 'Cabo', difficulty: 'Intermediário' },
  { name: 'Tríceps Coice (Halter/Polia)', targetMuscles: ['Tríceps'], equipment: 'Halter', difficulty: 'Intermediário' },
  { name: 'Mergulho nas Paralelas', targetMuscles: ['Tríceps', 'Peito', 'Ombros'], equipment: 'Peso Corporal', difficulty: 'Avançado' },
  { name: 'Mergulho no Banco', targetMuscles: ['Tríceps'], equipment: 'Peso Corporal', difficulty: 'Iniciante' },

  // --- ABDÔMEN / CORE ---
  { name: 'Prancha Abdominal', targetMuscles: ['Abdômen'], equipment: 'Peso Corporal', difficulty: 'Iniciante' },
  { name: 'Abdominal Supra (Crunch)', targetMuscles: ['Abdômen'], equipment: 'Peso Corporal', difficulty: 'Iniciante' },
  { name: 'Abdominal Supra na Polia', targetMuscles: ['Abdômen'], equipment: 'Cabo', difficulty: 'Intermediário' },
  { name: 'Abdominal Infra (Elevação de Pernas)', targetMuscles: ['Abdômen'], equipment: 'Peso Corporal', difficulty: 'Intermediário' },
  { name: 'Abdominal Infra Pendurado', targetMuscles: ['Abdômen'], equipment: 'Peso Corporal', difficulty: 'Avançado' },
  { name: 'Abdominal Oblíquo (Twist/Cabo)', targetMuscles: ['Abdômen'], equipment: 'Peso Corporal', difficulty: 'Intermediário' },
  { name: 'Roda Abdominal', targetMuscles: ['Abdômen', 'Core'], equipment: 'Equipamento', difficulty: 'Avançado' },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('✅ MongoDB Conectado para o Seed...');

    const bulkOperations = exercises.map((ex) => ({
      updateOne: {
        filter: { name: ex.name },
        update: { 
          $set: {
            name: ex.name,
            targetMuscles: ex.targetMuscles,
            equipment: ex.equipment,
            difficulty: ex.difficulty,
            gifUrl: ''
          } 
        },
        upsert: true
      }
    }));

    const result = await Exercise.bulkWrite(bulkOperations as any);
    
    console.log(`✅ Sincronização concluída!`);
    console.log(`🌱 Novos inseridos: ${result.upsertedCount}`);
    console.log(`🔄 Atualizados/Verificados: ${result.matchedCount}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao popular a base de dados:', error);
    process.exit(1);
  }
};

seedDB();