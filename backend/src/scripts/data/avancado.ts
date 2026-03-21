import mongoose from 'mongoose';

export const getAvancadoTemplates = (getExId: (name: string) => mongoose.Types.ObjectId) => [
  // ==========================================
  // AVANÇADO - FOCO: FULL BODY (2 Variações)
  // ==========================================
  {
    title: 'Full Body 1 HFT',
    description: 'Treino de corpo inteiro focado nos grandes levantamentos. Exige excelente recuperação. Treine 3x na semana com dias de descanso intercalados.',
    level: 'Avançado',
    focus: 'Full Body',
    workouts: [
      {
        title: 'Treino A - Foco Agachamento e Empurrada',
        exercises: [
          { exercise: getExId('Agachamento Livre'), sets: 5, reps: '6-8', notes: 'Desça profundo.' },
          { exercise: getExId('Supino Reto com Barra'), sets: 4, reps: '6-8' },
          { exercise: getExId('Barra Fixa (Pronada)'), sets: 4, reps: 'Falha' },
          { exercise: getExId('Desenvolvimento com Halteres'), sets: 3, reps: '10-12' },
          { exercise: getExId('Roda Abdominal'), sets: 4, reps: '10-12' },
        ]
      },
      {
        title: 'Treino B - Foco Terra e Puxada',
        exercises: [
          { exercise: getExId('Levantamento Terra'), sets: 5, reps: '5', notes: 'Técnica perfeita. Use cinto se necessário.' },
          { exercise: getExId('Supino Inclinado com Halteres'), sets: 4, reps: '8-10' },
          { exercise: getExId('Remada Curvada com Barra'), sets: 4, reps: '8-10' },
          { exercise: getExId('Mergulho nas Paralelas'), sets: 3, reps: 'Falha' },
          { exercise: getExId('Rosca Direta com Barra W'), sets: 3, reps: '10-12' },
        ]
      },
      {
        title: 'Treino C - Foco Unilateral e Volume',
        exercises: [
          { exercise: getExId('Agachamento Búlgaro'), sets: 4, reps: '10 cada perna' },
          { exercise: getExId('Supino Declinado'), sets: 4, reps: '8-10' },
          { exercise: getExId('Remada Cavalinho (T-Bar)'), sets: 4, reps: '10-12' },
          { exercise: getExId('Encolhimento com Barra'), sets: 4, reps: '12-15' },
          { exercise: getExId('Abdominal Infra Pendurado'), sets: 3, reps: '12-15' },
        ]
      }
    ]
  },
  {
    title: 'Full Body 2',
    description: 'Variação avançada que mistura exercícios de força base com isoladores estratégicos para quem não tem tempo de treinar 5x na semana.',
    level: 'Avançado',
    focus: 'Full Body',
    workouts: [
      {
        title: 'Treino A - Base Pesada',
        exercises: [
          { exercise: getExId('Agachamento Livre'), sets: 4, reps: '5' },
          { exercise: getExId('Supino Inclinado com Barra'), sets: 4, reps: '6-8' },
          { exercise: getExId('Remada Curvada Supinada'), sets: 4, reps: '6-8' },
          { exercise: getExId('Elevação Lateral na Polia'), sets: 4, reps: '12-15' },
          { exercise: getExId('Prancha Abdominal'), sets: 3, reps: '1 min' },
        ]
      },
      {
        title: 'Treino B - Sobrecarga Funcional',
        exercises: [
          { exercise: getExId('Levantamento Terra'), sets: 4, reps: '5' },
          { exercise: getExId('Desenvolvimento com Barra'), sets: 4, reps: '6-8' },
          { exercise: getExId('Barra Fixa (Supinada)'), sets: 4, reps: 'Falha' },
          { exercise: getExId('Leg Press 45º'), sets: 3, reps: '12' },
          { exercise: getExId('Tríceps Corda'), sets: 3, reps: '12' },
        ]
      }
    ]
  },

  // ==========================================
  // AVANÇADO - FOCO: PPL (3 Variações)
  // ==========================================
  {
    title: 'PPL 1',
    description: 'A rotina definitiva para hipertrofia avançada. PPL repetido duas vezes na semana (ABCABC).',
    level: 'Avançado',
    focus: 'PPL',
    workouts: [
      {
        title: 'Treino A - Push Heavy',
        exercises: [
          { exercise: getExId('Supino Reto com Barra'), sets: 4, reps: '6-8' },
          { exercise: getExId('Supino Inclinado com Halteres'), sets: 4, reps: '8-10' },
          { exercise: getExId('Mergulho nas Paralelas'), sets: 4, reps: 'Falha' },
          { exercise: getExId('Desenvolvimento com Barra'), sets: 4, reps: '8-10' },
          { exercise: getExId('Elevação Lateral com Halteres'), sets: 4, reps: '12-15' },
          { exercise: getExId('Tríceps Testa com Barra W'), sets: 4, reps: '10-12' },
        ]
      },
      {
        title: 'Treino B - Pull Heavy',
        exercises: [
          { exercise: getExId('Barra Fixa (Pronada)'), sets: 4, reps: 'Falha' },
          { exercise: getExId('Remada Curvada Supinada'), sets: 4, reps: '8-10' },
          { exercise: getExId('Remada Unilateral (Serrote)'), sets: 3, reps: '10-12' },
          { exercise: getExId('Crucifixo Invertido com Halteres'), sets: 4, reps: '15' },
          { exercise: getExId('Rosca Direta com Barra Reta'), sets: 4, reps: '8-10' },
          { exercise: getExId('Rosca Concentrada'), sets: 3, reps: '12' },
        ]
      },
      {
        title: 'Treino C - Legs Heavy',
        exercises: [
          { exercise: getExId('Agachamento Livre'), sets: 4, reps: '6-8' },
          { exercise: getExId('Leg Press 45º'), sets: 4, reps: '10-12' },
          { exercise: getExId('Stiff com Barra'), sets: 4, reps: '8-10' },
          { exercise: getExId('Cadeira Extensora'), sets: 4, reps: '12-15' },
          { exercise: getExId('Cadeira Flexora'), sets: 4, reps: '12-15' },
          { exercise: getExId('Gêmeos no Leg Press'), sets: 5, reps: '15' },
        ]
      }
    ]
  },
  {
    title: 'PPL 2',
    description: 'A famosa divisão clássica onde você treina músculos antagonistas (Peito e Costas) no mesmo dia para um pump absurdo.',
    level: 'Avançado',
    focus: 'PPL',
    workouts: [
      {
        title: 'Treino A - Peito e Costas',
        exercises: [
          { exercise: getExId('Supino Reto com Barra'), sets: 4, reps: '8-10' },
          { exercise: getExId('Barra Fixa (Pronada)'), sets: 4, reps: 'Falha' },
          { exercise: getExId('Supino Inclinado com Halteres'), sets: 4, reps: '10-12' },
          { exercise: getExId('Remada Curvada Supinada'), sets: 4, reps: '10-12' },
          { exercise: getExId('Crucifixo Reto com Halteres'), sets: 3, reps: '12' },
          { exercise: getExId('Pullover'), sets: 3, reps: '12' },
        ]
      },
      {
        title: 'Treino B - Pernas',
        exercises: [
          { exercise: getExId('Agachamento Livre'), sets: 5, reps: '8' },
          { exercise: getExId('Leg Press 45º'), sets: 4, reps: '10' },
          { exercise: getExId('Stiff com Barra'), sets: 4, reps: '10' },
          { exercise: getExId('Cadeira Extensora'), sets: 4, reps: '15' },
          { exercise: getExId('Mesa Flexora'), sets: 4, reps: '15' },
        ]
      },
      {
        title: 'Treino C - Ombros e Braços',
        exercises: [
          { exercise: getExId('Desenvolvimento com Halteres'), sets: 4, reps: '8-10' },
          { exercise: getExId('Elevação Lateral com Halteres'), sets: 4, reps: '12-15' },
          { exercise: getExId('Rosca Direta com Barra W'), sets: 4, reps: '10' },
          { exercise: getExId('Tríceps Testa com Barra W'), sets: 4, reps: '10' },
          { exercise: getExId('Rosca Alternada com Halteres'), sets: 3, reps: '12' },
          { exercise: getExId('Tríceps Pulley (Barra Reta/V)'), sets: 3, reps: '12' },
        ]
      }
    ]
  },

  // ==========================================
  // AVANÇADO - FOCO: SUPERIORES (2 Variações)
  // ==========================================
  {
    title: 'Superiores 1',
    description: 'Um músculo por dia, massacrado de todos os ângulos. Perfeito para corrigir assimetrias musculares e gerar máximo pump.',
    level: 'Avançado',
    focus: 'Superiores',
    workouts: [
      {
        title: 'Treino A - Peitoral',
        exercises: [
          { exercise: getExId('Supino Inclinado com Halteres'), sets: 4, reps: '8-10' },
          { exercise: getExId('Supino Reto com Barra'), sets: 4, reps: '8-10' },
          { exercise: getExId('Crucifixo Inclinado'), sets: 4, reps: '12-15' },
          { exercise: getExId('Mergulho nas Paralelas'), sets: 3, reps: 'Falha' },
          { exercise: getExId('Crossover (Polia Alta)'), sets: 4, reps: '15' },
        ]
      },
      {
        title: 'Treino B - Dorsais',
        exercises: [
          { exercise: getExId('Barra Fixa (Pronada)'), sets: 4, reps: 'Falha' },
          { exercise: getExId('Remada Curvada com Barra'), sets: 4, reps: '8-10' },
          { exercise: getExId('Remada Cavalinho (T-Bar)'), sets: 4, reps: '10-12' },
          { exercise: getExId('Remada Unilateral (Serrote)'), sets: 3, reps: '10-12' },
          { exercise: getExId('Pullover'), sets: 4, reps: '12-15' },
        ]
      },
      {
        title: 'Treino C - Ombros',
        exercises: [
          { exercise: getExId('Desenvolvimento com Halteres'), sets: 4, reps: '8-10' },
          { exercise: getExId('Elevação Lateral com Halteres'), sets: 4, reps: '12' },
          { exercise: getExId('Elevação Lateral na Polia'), sets: 4, reps: '15' },
          { exercise: getExId('Crucifixo Invertido com Halteres'), sets: 4, reps: '15' },
          { exercise: getExId('Encolhimento com Barra'), sets: 5, reps: '12-15' },
        ]
      },
      {
        title: 'Treino D - Braços',
        exercises: [
          { exercise: getExId('Tríceps Testa com Barra W'), sets: 4, reps: '10-12' },
          { exercise: getExId('Rosca Direta com Barra W'), sets: 4, reps: '10-12' },
          { exercise: getExId('Tríceps Francês na Polia'), sets: 3, reps: '12-15' },
          { exercise: getExId('Rosca Alternada com Halteres'), sets: 3, reps: '12-15' },
          { exercise: getExId('Tríceps Corda'), sets: 3, reps: '15' },
          { exercise: getExId('Rosca Scott (Máquina/Barra)'), sets: 3, reps: '15' },
        ]
      }
    ]
  },
  {
    title: 'Superiores 2',
    description: 'Três dias brutais para a parte superior, permitindo treinar peito e costas duas vezes na semana com intensidade ondulatória.',
    level: 'Avançado',
    focus: 'Superiores',
    workouts: [
      {
        title: 'Treino A - Upper (Força Base)',
        exercises: [
          { exercise: getExId('Supino Reto com Barra'), sets: 4, reps: '5-6' },
          { exercise: getExId('Remada Curvada com Barra'), sets: 4, reps: '5-6' },
          { exercise: getExId('Desenvolvimento com Barra'), sets: 4, reps: '6-8' },
          { exercise: getExId('Barra Fixa (Supinada)'), sets: 4, reps: 'Falha' },
        ]
      },
      {
        title: 'Treino B - Push (Hipertrofia Empurrar)',
        exercises: [
          { exercise: getExId('Supino Inclinado com Halteres'), sets: 4, reps: '10' },
          { exercise: getExId('Mergulho nas Paralelas'), sets: 4, reps: '10' },
          { exercise: getExId('Elevação Lateral com Halteres'), sets: 4, reps: '15' },
          { exercise: getExId('Tríceps Francês (Halter Único)'), sets: 3, reps: '12' },
        ]
      },
      {
        title: 'Treino C - Pull (Hipertrofia Puxar)',
        exercises: [
          { exercise: getExId('Remada Unilateral (Serrote)'), sets: 4, reps: '10' },
          { exercise: getExId('Puxada Frontal (Pulldown)'), sets: 4, reps: '10-12' },
          { exercise: getExId('Crucifixo Invertido com Halteres'), sets: 4, reps: '15' },
          { exercise: getExId('Rosca Concentrada'), sets: 3, reps: '12' },
        ]
      }
    ]
  },

  // ==========================================
  // AVANÇADO - FOCO: INFERIORES (2 Variações)
  // ==========================================
  {
    title: 'Inferiores 1',
    description: 'Dois dias brutais focando na exaustão total do quadríceps e da cadeia posterior.',
    level: 'Avançado',
    focus: 'Inferiores',
    workouts: [
      {
        title: 'Treino A - Massacre de Quadríceps',
        exercises: [
          { exercise: getExId('Agachamento Livre'), sets: 5, reps: '6-8' },
          { exercise: getExId('Agachamento Búlgaro'), sets: 4, reps: '10-12 cada perna' },
          { exercise: getExId('Leg Press 45º'), sets: 4, reps: '12-15' },
          { exercise: getExId('Cadeira Extensora'), sets: 5, reps: '15', notes: 'Na última série, reduza o peso e faça até a falha.' },
          { exercise: getExId('Gêmeos em Pé no Smith'), sets: 5, reps: '15-20' },
        ]
      },
      {
        title: 'Treino B - Posterior, Glúteo e Lombar',
        exercises: [
          { exercise: getExId('Levantamento Terra'), sets: 4, reps: '5-8' },
          { exercise: getExId('Elevação Pélvica'), sets: 5, reps: '10-12' },
          { exercise: getExId('Stiff com Halteres'), sets: 4, reps: '10-12' },
          { exercise: getExId('Mesa Flexora'), sets: 4, reps: '12-15' },
          { exercise: getExId('Cadeira Abdutora'), sets: 4, reps: '15-20' },
        ]
      }
    ]
  },
  {
    title: 'Inferiores 2',
    description: 'Rotina avançada isolando totalmente o trabalho da cadeia posterior para corrigir pontos fracos no físico.',
    level: 'Avançado',
    focus: 'Inferiores',
    workouts: [
      {
        title: 'Treino A - Posterior Absoluto',
        exercises: [
          { exercise: getExId('Elevação Pélvica'), sets: 5, reps: '8-10', notes: 'Pico de contração de 3s.' },
          { exercise: getExId('Stiff com Barra'), sets: 4, reps: '10' },
          { exercise: getExId('Agachamento Sumô'), sets: 4, reps: '10-12' },
          { exercise: getExId('Cadeira Abdutora'), sets: 4, reps: '15' },
        ]
      },
      {
        title: 'Treino B - Posterior Absoluto',
        exercises: [
          { exercise: getExId('Levantamento Terra'), sets: 4, reps: '6' },
          { exercise: getExId('Passada / Avanço'), sets: 4, reps: '12 passos' },
          { exercise: getExId('Mesa Flexora'), sets: 4, reps: '12' },
          { exercise: getExId('Cadeira Flexora'), sets: 4, reps: '12' },
        ]
      }
    ]
  },

  // ==========================================
  // AVANÇADO - FOCO: FORÇA (2 Variações)
  // ==========================================
  {
    title: 'Força 1',
    description: 'Programa rigoroso para aumentar suas cargas máximas (1RM). Descansos longos (3 a 5 min). Volume baixo, intensidade máxima.',
    level: 'Avançado',
    focus: 'Força',
    workouts: [
      {
        title: 'Treino A - Supino Pesado',
        exercises: [
          { exercise: getExId('Supino Reto com Barra'), sets: 5, reps: '3-5' },
          { exercise: getExId('Desenvolvimento com Barra'), sets: 4, reps: '5-8' },
          { exercise: getExId('Supino Inclinado com Halteres'), sets: 3, reps: '8-10' },
          { exercise: getExId('Mergulho nas Paralelas'), sets: 4, reps: '8' },
        ]
      },
      {
        title: 'Treino B - Levantamento Terra Pesado',
        exercises: [
          { exercise: getExId('Levantamento Terra'), sets: 5, reps: '3-5' },
          { exercise: getExId('Barra Fixa (Pronada)'), sets: 4, reps: '6-8' },
          { exercise: getExId('Remada Curvada com Barra'), sets: 4, reps: '8-10' },
          { exercise: getExId('Encolhimento com Barra'), sets: 4, reps: '10-12' },
        ]
      },
      {
        title: 'Treino C - Agachamento Pesado',
        exercises: [
          { exercise: getExId('Agachamento Livre'), sets: 5, reps: '3-5' },
          { exercise: getExId('Stiff com Barra'), sets: 4, reps: '8-10' },
          { exercise: getExId('Leg Press 45º'), sets: 4, reps: '10' },
          { exercise: getExId('Roda Abdominal'), sets: 4, reps: '10-12' },
        ]
      }
    ]
  },
  {
    title: 'Força 2',
    description: 'Rotina de força pura focada nos 4 grandes levantamentos. Faça 1 levantamento principal pesado por dia e o resto hipertrofia.',
    level: 'Avançado',
    focus: 'Força',
    workouts: [
      {
        title: 'Treino A - Supino',
        exercises: [
          { exercise: getExId('Supino Reto com Barra'), sets: 4, reps: '5/3/1' },
          { exercise: getExId('Supino Inclinado com Halteres'), sets: 4, reps: '10' },
          { exercise: getExId('Remada Curvada com Barra'), sets: 4, reps: '10' },
          { exercise: getExId('Tríceps Corda'), sets: 3, reps: '12' },
        ]
      },
      {
        title: 'Treino B - Agachamento',
        exercises: [
          { exercise: getExId('Agachamento Livre'), sets: 4, reps: '5/3/1' },
          { exercise: getExId('Leg Press 45º'), sets: 4, reps: '10' },
          { exercise: getExId('Mesa Flexora'), sets: 4, reps: '12' },
          { exercise: getExId('Prancha Abdominal'), sets: 3, reps: '1 min' },
        ]
      },
      {
        title: 'Treino C - Desenvolvimento',
        exercises: [
          { exercise: getExId('Desenvolvimento com Barra'), sets: 4, reps: '5/3/1' },
          { exercise: getExId('Barra Fixa (Pronada)'), sets: 4, reps: '10' },
          { exercise: getExId('Elevação Lateral na Polia'), sets: 4, reps: '15' },
          { exercise: getExId('Rosca Martelo com Halteres'), sets: 3, reps: '12' },
        ]
      },
      {
        title: 'Treino D - Terra',
        exercises: [
          { exercise: getExId('Levantamento Terra'), sets: 4, reps: '5/3/1' },
          { exercise: getExId('Stiff com Halteres'), sets: 4, reps: '10' },
          { exercise: getExId('Cadeira Extensora'), sets: 4, reps: '15' },
          { exercise: getExId('Roda Abdominal'), sets: 3, reps: '12' },
        ]
      }
    ]
  }
];