import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exercise from '../models/Exercise';

dotenv.config();

const exercises = [
  // --- PEITO ---
  { name: 'Supino Reto com Barra', targetMuscles: ['Peito', 'Tríceps', 'Ombros'], equipment: 'Barra', difficulty: 'Intermediário', gifUrl: '/exercises/supino-reto.gif' },
  { name: 'Supino Reto com Halteres', targetMuscles: ['Peito', 'Tríceps', 'Ombros'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/supino-halter.gif' },
  { name: 'Supino Inclinado com Barra', targetMuscles: ['Peito', 'Ombros'], equipment: 'Barra', difficulty: 'Intermediário', gifUrl: '/exercises/supino-inclinado-barra.gif' },
  { name: 'Supino Inclinado com Halteres', targetMuscles: ['Peito', 'Ombros'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/supino-inclinado-halter.gif' },
  { name: 'Supino Declinado', targetMuscles: ['Peito', 'Tríceps'], equipment: 'Barra', difficulty: 'Avançado', gifUrl: '/exercises/supino-declinado.gif' },
  { name: 'Supino Máquina Articulada', targetMuscles: ['Peito', 'Tríceps'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/supino-maquina.gif' },
  { name: 'Crucifixo Reto com Halteres', targetMuscles: ['Peito'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/crucifixo-halter.gif' },
  { name: 'Crucifixo Inclinado', targetMuscles: ['Peito'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/crucifixo-inclinado.gif' },
  { name: 'Crucifixo na Máquina (Peck Deck)', targetMuscles: ['Peito'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/crucifixo-maquina.gif' },
  { name: 'Crossover (Polia Alta)', targetMuscles: ['Peito'], equipment: 'Cabo', difficulty: 'Intermediário', gifUrl: '/exercises/cross-alta.gif' },
  { name: 'Crossover (Polia Média)', targetMuscles: ['Peito'], equipment: 'Cabo', difficulty: 'Intermediário', gifUrl: '/exercises/cross-media.gif' },
  { name: 'Crossover (Polia Baixa)', targetMuscles: ['Peito'], equipment: 'Cabo', difficulty: 'Intermediário', gifUrl: '/exercises/cross-baixa.gif' },
  { name: 'Pullover', targetMuscles: ['Peito', 'Costas'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/pullover.gif' },
  { name: 'Flexão de Braços', targetMuscles: ['Peito', 'Tríceps', 'Ombros'], equipment: 'Peso Corporal', difficulty: 'Iniciante', gifUrl: '/exercises/flexao.gif' },

  // --- COSTAS ---
  { name: 'Puxada Frontal (Pulldown)', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/puxada.gif' },
  { name: 'Puxada com Triângulo', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/puxada-triangulo.gif' },
  { name: 'Remada Curvada com Barra', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Barra', difficulty: 'Avançado', gifUrl: '/exercises/remada-curvada-barra.gif' },
  { name: 'Remada Curvada Supinada', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Barra', difficulty: 'Avançado', gifUrl: '/exercises/remada-curvada-supinada.gif' },
  { name: 'Remada Baixa com Triângulo', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Cabo', difficulty: 'Intermediário', gifUrl: '/exercises/remada-baixa-triangulo.gif' },
  { name: 'Remada Unilateral (Serrote)', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/remada-unilateral.gif' },
  { name: 'Remada Cavalinho (T-Bar)', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Barra', difficulty: 'Intermediário', gifUrl: '/exercises/remada-cavalinho.gif' },
  { name: 'Remada Máquina Articulada', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/remada-maquina-articulada.gif' },
  { name: 'Pull-down na Polia Alta', targetMuscles: ['Costas'], equipment: 'Cabo', difficulty: 'Intermediário', gifUrl: '/exercises/pulldown-polia.gif' },
  { name: 'Barra Fixa (Pronada)', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Peso Corporal', difficulty: 'Avançado', gifUrl: '/exercises/barra-fixa-pronada.gif' },
  { name: 'Barra Fixa (Supinada)', targetMuscles: ['Costas', 'Bíceps'], equipment: 'Peso Corporal', difficulty: 'Avançado', gifUrl: '/exercises/barra-fixa-supinada.gif' },
  { name: 'Levantamento Terra', targetMuscles: ['Costas', 'Pernas', 'Glúteos'], equipment: 'Barra', difficulty: 'Avançado', gifUrl: '/exercises/levantamento-terra.gif' },

  // --- PERNAS & GLÚTEOS ---
  { name: 'Agachamento Livre', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Barra', difficulty: 'Avançado', gifUrl: '/exercises/agachamento.gif' },
  { name: 'Agachamento no Smith', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Máquina', difficulty: 'Intermediário', gifUrl: '/exercises/agachamento-smith.gif' },
  { name: 'Agachamento Sumô', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/agachamento-sumo.gif' },
  { name: 'Agachamento Búlgaro', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Halter', difficulty: 'Avançado', gifUrl: '/exercises/agachamento-bulgaro.gif' },
  { name: 'Leg Press 45º', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/leg-press-45.gif' },
  { name: 'Leg Press Horizontal', targetMuscles: ['Pernas'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/leg-press-horizontal.gif' },
  { name: 'Cadeira Extensora', targetMuscles: ['Pernas'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/cadeira-extensora.gif' },
  { name: 'Mesa Flexora', targetMuscles: ['Pernas'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/mesa-flexora.gif' },
  { name: 'Cadeira Flexora', targetMuscles: ['Pernas'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/cadeira-flexora.gif' },
  { name: 'Stiff com Barra', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Barra', difficulty: 'Intermediário', gifUrl: '/exercises/stiff-barra.gif' },
  { name: 'Stiff com Halteres', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/stiff-halter.gif' },
  { name: 'Elevação Pélvica', targetMuscles: ['Glúteos', 'Pernas'], equipment: 'Barra', difficulty: 'Intermediário', gifUrl: '/exercises/elevacao-pelvica.gif' },
  { name: 'Cadeira Abdutora', targetMuscles: ['Glúteos'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/cadeira-abdutora.gif' },
  { name: 'Cadeira Adutora', targetMuscles: ['Pernas'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/cadeira-adutora.gif' },
  { name: 'Passada / Avanço', targetMuscles: ['Pernas', 'Glúteos'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/passada.gif' },

  // --- PANTURRILHAS ---
  { name: 'Gêmeos Sentado', targetMuscles: ['Panturrilhas'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/gemeos-sentado.gif' },
  { name: 'Gêmeos em Pé no Smith', targetMuscles: ['Panturrilhas'], equipment: 'Máquina', difficulty: 'Intermediário', gifUrl: '/exercises/gemeos-smith.gif' },
  { name: 'Gêmeos no Leg Press', targetMuscles: ['Panturrilhas'], equipment: 'Máquina', difficulty: 'Intermediário', gifUrl: '/exercises/gemeos-leg.gif' },

  // --- OMBROS & TRAPÉZIO ---
  { name: 'Desenvolvimento com Barra', targetMuscles: ['Ombros', 'Tríceps'], equipment: 'Barra', difficulty: 'Intermediário', gifUrl: '/exercises/desenvolvimento-barra.gif' },
  { name: 'Desenvolvimento com Halteres', targetMuscles: ['Ombros', 'Tríceps'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/desenvolvimento-halter.gif' },
  { name: 'Desenvolvimento Máquina', targetMuscles: ['Ombros', 'Tríceps'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/desenvolvimento-maquina.gif' },
  { name: 'Elevação Lateral com Halteres', targetMuscles: ['Ombros'], equipment: 'Halter', difficulty: 'Iniciante', gifUrl: '/exercises/elevacao-lateral.gif' },
  { name: 'Elevação Lateral na Polia', targetMuscles: ['Ombros'], equipment: 'Cabo', difficulty: 'Intermediário', gifUrl: '/exercises/elevacao-lateral-polia.gif' },
  { name: 'Elevação Frontal com Halteres', targetMuscles: ['Ombros'], equipment: 'Halter', difficulty: 'Iniciante', gifUrl: '/exercises/elevacao-frontal-halter.gif' },
  { name: 'Elevação Frontal na Polia', targetMuscles: ['Ombros'], equipment: 'Cabo', difficulty: 'Intermediário', gifUrl: '/exercises/elevacao-frontal-polia.gif' },
  { name: 'Crucifixo Invertido (Peck Deck)', targetMuscles: ['Ombros', 'Costas'], equipment: 'Máquina', difficulty: 'Iniciante', gifUrl: '/exercises/crucifixo-invertido-maquina.gif' },
  { name: 'Crucifixo Invertido com Halteres', targetMuscles: ['Ombros', 'Costas'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/crucifixo-invertido.gif' },
  { name: 'Encolhimento com Halteres', targetMuscles: ['Trapézio'], equipment: 'Halter', difficulty: 'Iniciante', gifUrl: '/exercises/encolhimento-halter.gif' },
  { name: 'Encolhimento com Barra', targetMuscles: ['Trapézio'], equipment: 'Barra', difficulty: 'Intermediário', gifUrl: '/exercises/encolhimento-barra.gif' },

  // --- BÍCEPS & ANTEBRAÇO ---
  { name: 'Rosca Direta com Barra Reta', targetMuscles: ['Bíceps'], equipment: 'Barra', difficulty: 'Iniciante', gifUrl: '/exercises/rosca-direta-barra.gif' },
  { name: 'Rosca Direta com Barra W', targetMuscles: ['Bíceps'], equipment: 'Barra', difficulty: 'Iniciante', gifUrl: '/exercises/rosca-direta-barraw.gif' },
  { name: 'Rosca Direta na Polia', targetMuscles: ['Bíceps'], equipment: 'Cabo', difficulty: 'Iniciante', gifUrl: '/exercises/rosca-direta-polia.gif' },
  { name: 'Rosca Alternada com Halteres', targetMuscles: ['Bíceps'], equipment: 'Halter', difficulty: 'Iniciante', gifUrl: '/exercises/rosca-alternada-halter.gif' },
  { name: 'Rosca Martelo com Halteres', targetMuscles: ['Bíceps', 'Antebraço'], equipment: 'Halter', difficulty: 'Iniciante', gifUrl: '/exercises/rosca-martelo-halter.gif' },
  { name: 'Rosca Martelo na Polia (Corda)', targetMuscles: ['Bíceps', 'Antebraço'], equipment: 'Cabo', difficulty: 'Intermediário', gifUrl: '/exercises/rosca-martelo-polia.gif' },
  { name: 'Rosca Scott (Máquina/Barra)', targetMuscles: ['Bíceps'], equipment: 'Máquina', difficulty: 'Intermediário', gifUrl: '/exercises/rosca-scott.gif' },
  { name: 'Rosca Concentrada', targetMuscles: ['Bíceps'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/rosca-concentrada.gif' },
  { name: 'Rosca Inversa (Barra/Polia)', targetMuscles: ['Antebraço', 'Bíceps'], equipment: 'Barra', difficulty: 'Intermediário', gifUrl: '/exercises/rosca-inversa.gif' },
  { name: 'Rosca Inclinada com Halteres', targetMuscles: ['Antebraço', 'Bíceps'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/rosca-inclinada.gif' },

  // --- TRÍCEPS ---
  { name: 'Tríceps Pulley (Barra Reta/V)', targetMuscles: ['Tríceps'], equipment: 'Cabo', difficulty: 'Iniciante', gifUrl: '/exercises/triceps-pulley.gif' },
  { name: 'Tríceps Corda', targetMuscles: ['Tríceps'], equipment: 'Cabo', difficulty: 'Iniciante', gifUrl: '/exercises/triceps-corda.gif' },
  { name: 'Tríceps Testa com Barra W', targetMuscles: ['Tríceps'], equipment: 'Barra', difficulty: 'Intermediário', gifUrl: '/exercises/triceps-testa-barraw.gif' },
  { name: 'Tríceps Testa na Polia', targetMuscles: ['Tríceps'], equipment: 'Cabo', difficulty: 'Intermediário', gifUrl: '/exercises/triceps-testa-polia.gif' },
  { name: 'Tríceps Francês (Halter Único)', targetMuscles: ['Tríceps'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/triceps-frances.gif' },
  { name: 'Tríceps Francês na Polia', targetMuscles: ['Tríceps'], equipment: 'Cabo', difficulty: 'Intermediário', gifUrl: '/exercises/triceps-frances-polia.gif' },
  { name: 'Tríceps Coice (Halter/Polia)', targetMuscles: ['Tríceps'], equipment: 'Halter', difficulty: 'Intermediário', gifUrl: '/exercises/triceps-coice.gif' },
  { name: 'Mergulho nas Paralelas', targetMuscles: ['Tríceps', 'Peito', 'Ombros'], equipment: 'Peso Corporal', difficulty: 'Avançado', gifUrl: '/exercises/paralelas.gif' },
  { name: 'Mergulho no Banco', targetMuscles: ['Tríceps'], equipment: 'Peso Corporal', difficulty: 'Iniciante', gifUrl: '/exercises/triceps-banco.gif' },

  // --- ABDÔMEN / CORE ---
  { name: 'Prancha Abdominal', targetMuscles: ['Abdômen'], equipment: 'Peso Corporal', difficulty: 'Iniciante', gifUrl: '/exercises/prancha-abdominal.gif' },
  { name: 'Abdominal Supra (Crunch)', targetMuscles: ['Abdômen'], equipment: 'Peso Corporal', difficulty: 'Iniciante', gifUrl: '/exercises/crunch.gif' },
  { name: 'Abdominal Supra na Polia', targetMuscles: ['Abdômen'], equipment: 'Cabo', difficulty: 'Intermediário', gifUrl: '/exercises/abdominal-supra-polia.gif' },
  { name: 'Abdominal Infra (Elevação de Pernas)', targetMuscles: ['Abdômen'], equipment: 'Peso Corporal', difficulty: 'Intermediário', gifUrl: '/exercises/abdominal-infra.gif' },
  { name: 'Abdominal Infra Pendurado', targetMuscles: ['Abdômen'], equipment: 'Peso Corporal', difficulty: 'Avançado', gifUrl: '/exercises/abdominal-infra-pendurado.gif' },
  { name: 'Abdominal Oblíquo (Twist/Cabo)', targetMuscles: ['Abdômen'], equipment: 'Peso Corporal', difficulty: 'Intermediário', gifUrl: '/exercises/abdominal-obliquo.gif' },
  { name: 'Roda Abdominal', targetMuscles: ['Abdômen', 'Core'], equipment: 'Equipamento', difficulty: 'Avançado', gifUrl: '/exercises/abdominal-roda.gif' }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('✅ MongoDB Conectado para o Seed...');

    //await Exercise.deleteMany({});
    //console.log('🧹 Banco de dados limpo! Todos os exercícios antigos foram apagados.');

    const bulkOperations = exercises.map((ex) => ({
      updateOne: {
        filter: { name: ex.name },
        update: { 
          $set: {
            name: ex.name,
            targetMuscles: ex.targetMuscles,
            equipment: ex.equipment,
            difficulty: ex.difficulty,
            gifUrl: ex.gifUrl 
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