import mongoose from 'mongoose';

export const getIntermediarioTemplates = (getExId: (name: string) => mongoose.Types.ObjectId) => [
  // ==========================================
  // INTERMEDIÁRIO - FOCO: FULL BODY
  // ==========================================
  {
    title: 'Full Body 1',
    description: 'Um treino de corpo inteiro utilizando exercícios compostos e pesos livres. Ideal para quem tem apenas 3 dias na semana, mas quer alta intensidade.',
    level: 'Intermediário',
    focus: 'Full Body',
    workouts: [
      {
        title: 'Treino A - Foco em Empurrar e Agachar',
        exercises: [
          { exercise: getExId('Agachamento no Smith'), sets: 4, reps: '10-12', notes: 'Desça até 90 graus ou um pouco mais se a mobilidade permitir.' },
          { exercise: getExId('Supino Reto com Halteres'), sets: 4, reps: '8-10' },
          { exercise: getExId('Remada Curvada com Barra'), sets: 4, reps: '10-12' },
          { exercise: getExId('Desenvolvimento com Halteres'), sets: 3, reps: '10-12' },
          { exercise: getExId('Tríceps Testa com Barra W'), sets: 3, reps: '12' },
          { exercise: getExId('Abdominal Supra na Polia'), sets: 3, reps: '15' },
        ]
      },
      {
        title: 'Treino B - Foco em Puxar e Posterior',
        exercises: [
          { exercise: getExId('Stiff com Halteres'), sets: 4, reps: '10-12', notes: 'Mantenha as costas retas e sinta alongar o posterior.' },
          { exercise: getExId('Puxada com Triângulo'), sets: 4, reps: '10-12' },
          { exercise: getExId('Supino Inclinado com Halteres'), sets: 3, reps: '10-12' },
          { exercise: getExId('Passada / Avanço'), sets: 3, reps: '12 cada perna' },
          { exercise: getExId('Rosca Alternada com Halteres'), sets: 3, reps: '12' },
          { exercise: getExId('Prancha Abdominal'), sets: 3, reps: '45s' },
        ]
      }
    ]
  },
  {
    title: 'Full Body 2',
    description: 'Treino completo para intermediários com maior volume e variação de estímulos.',
    level: 'Intermediário',
    focus: 'Full Body',
    workouts: [
        {
        title: 'Treino A - Base de Força',
        exercises: [
            { exercise: getExId('Agachamento no Smith'), sets: 4, reps: '8-10' },
            { exercise: getExId('Supino Reto com Halteres'), sets: 4, reps: '8-10' },
            { exercise: getExId('Puxada Frontal (Pulldown)'), sets: 4, reps: '8-10' },
            { exercise: getExId('Desenvolvimento com Halteres'), sets: 3, reps: '10-12' },
            { exercise: getExId('Prancha Abdominal'), sets: 3, reps: '40s' }
        ]
        },
        {
        title: 'Treino B - Volume Global',
        exercises: [
            { exercise: getExId('Leg Press 45º'), sets: 4, reps: '10-12' },
            { exercise: getExId('Supino Inclinado com Halteres'), sets: 3, reps: '10-12' },
            { exercise: getExId('Remada Baixa com Triângulo'), sets: 4, reps: '10-12' },
            { exercise: getExId('Rosca Martelo com Halteres'), sets: 3, reps: '10-12' },
            { exercise: getExId('Tríceps Corda'), sets: 3, reps: '10-12' }
        ]
        },
        {
        title: 'Treino C - Controle Muscular',
        exercises: [
            { exercise: getExId('Stiff com Halteres'), sets: 4, reps: '10' },
            { exercise: getExId('Crucifixo na Máquina (Peck Deck)'), sets: 3, reps: '12' },
            { exercise: getExId('Remada Máquina Articulada'), sets: 4, reps: '10-12' },
            { exercise: getExId('Elevação Lateral com Halteres'), sets: 3, reps: '12' },
            { exercise: getExId('Abdominal Infra (Elevação de Pernas)'), sets: 3, reps: '15' }
        ]
        }
    ]
  },

  // ==========================================
  // INTERMEDIÁRIO - FOCO: PPL (Push/Pull/Legs)
  // ==========================================
  {
    title: 'PPL 1',
    description: 'A transição perfeita para o intermediário. Mais volume por grupo muscular, combinando barras e halteres com isoladores em polia.',
    level: 'Intermediário',
    focus: 'PPL',
    workouts: [
      {
        title: 'Push (Peito, Ombro e Tríceps)',
        exercises: [
          { exercise: getExId('Supino Reto com Halteres'), sets: 4, reps: '8-10' },
          { exercise: getExId('Supino Inclinado com Barra'), sets: 3, reps: '10-12' },
          { exercise: getExId('Crossover (Polia Média)'), sets: 3, reps: '12-15' },
          { exercise: getExId('Desenvolvimento com Halteres'), sets: 4, reps: '10-12' },
          { exercise: getExId('Elevação Lateral na Polia'), sets: 4, reps: '12-15', notes: 'Movimento contínuo, sem descanso no fundo.' },
          { exercise: getExId('Tríceps Corda'), sets: 4, reps: '12-15' },
        ]
      },
      {
        title: 'Pull (Costas e Bíceps)',
        exercises: [
          { exercise: getExId('Pull-down na Polia Alta'), sets: 3, reps: '12-15', notes: 'Pré-exaustão para as dorsais.' },
          { exercise: getExId('Remada Curvada Supinada'), sets: 4, reps: '8-10' },
          { exercise: getExId('Remada Unilateral (Serrote)'), sets: 3, reps: '10-12' },
          { exercise: getExId('Crucifixo Invertido com Halteres'), sets: 3, reps: '12-15' },
          { exercise: getExId('Rosca Direta com Barra W'), sets: 4, reps: '10-12' },
          { exercise: getExId('Rosca Scott (Máquina/Barra)'), sets: 3, reps: '12' },
        ]
      },
      {
        title: 'Legs (Membros Inferiores)',
        exercises: [
          { exercise: getExId('Agachamento no Smith'), sets: 4, reps: '8-10' },
          { exercise: getExId('Leg Press 45º'), sets: 3, reps: '10-12' },
          { exercise: getExId('Stiff com Barra'), sets: 4, reps: '10-12' },
          { exercise: getExId('Cadeira Extensora'), sets: 3, reps: '12-15' },
          { exercise: getExId('Mesa Flexora'), sets: 3, reps: '12-15' },
          { exercise: getExId('Gêmeos em Pé no Smith'), sets: 4, reps: '15-20' },
        ]
      }
    ]
  },
  {
    title: 'PPL com Foco em Ombros (V-Shape)',
    description: 'Variação do PPL projetada para alargar a cintura escapular. Ênfase em elevações laterais e desenvolvimento para criar o formato em "V".',
    level: 'Intermediário',
    focus: 'PPL',
    workouts: [
      {
        title: 'Push + Foco Deltóide',
        exercises: [
          { exercise: getExId('Desenvolvimento com Barra'), sets: 4, reps: '8-10' },
          { exercise: getExId('Supino Inclinado com Halteres'), sets: 4, reps: '10-12' },
          { exercise: getExId('Supino Máquina Articulada'), sets: 3, reps: '12' },
          { exercise: getExId('Elevação Lateral com Halteres'), sets: 4, reps: '12-15' },
          { exercise: getExId('Elevação Frontal na Polia'), sets: 3, reps: '12' },
          { exercise: getExId('Tríceps Testa na Polia'), sets: 3, reps: '12' },
        ]
      },
      {
        title: 'Pull + Deltóide Posterior',
        exercises: [
          { exercise: getExId('Barra Fixa (Supinada)'), sets: 4, reps: 'Máx' },
          { exercise: getExId('Remada Cavalinho (T-Bar)'), sets: 4, reps: '10-12' },
          { exercise: getExId('Crucifixo Invertido com Halteres'), sets: 4, reps: '15' },
          { exercise: getExId('Encolhimento com Barra'), sets: 4, reps: '12-15' },
          { exercise: getExId('Rosca Inclinada com Halteres'), sets: 3, reps: '12' },
        ]
      },
      {
        title: 'Legs e Core',
        exercises: [
          { exercise: getExId('Leg Press 45º'), sets: 4, reps: '10-12' },
          { exercise: getExId('Agachamento Sumô'), sets: 3, reps: '12' },
          { exercise: getExId('Elevação Pélvica'), sets: 3, reps: '12' },
          { exercise: getExId('Cadeira Flexora'), sets: 4, reps: '15' },
          { exercise: getExId('Abdominal Oblíquo (Twist/Cabo)'), sets: 3, reps: '15 cada lado' },
        ]
      }
    ]
  },

  // ==========================================
  // INTERMEDIÁRIO - FOCO: SUPERIORES
  // ==========================================
  {
    title: 'Superiores 1',
    description: 'Divisão ABx2 (Upper/Lower). Você treina superiores 2 vezes na semana com alto volume, garantindo o máximo de hipertrofia no peitoral e costas.',
    level: 'Intermediário',
    focus: 'Superiores',
    workouts: [
      {
        title: 'Upper A (Foco Força e Densidade)',
        exercises: [
          { exercise: getExId('Supino Reto com Barra'), sets: 4, reps: '6-8' },
          { exercise: getExId('Remada Curvada com Barra'), sets: 4, reps: '8-10' },
          { exercise: getExId('Desenvolvimento com Halteres'), sets: 3, reps: '10-12' },
          { exercise: getExId('Puxada com Triângulo'), sets: 3, reps: '10-12' },
          { exercise: getExId('Tríceps Testa com Barra W'), sets: 3, reps: '10-12' },
          { exercise: getExId('Rosca Alternada com Halteres'), sets: 3, reps: '10-12' },
        ]
      },
      {
        title: 'Lower A (Manutenção)',
        exercises: [
          { exercise: getExId('Agachamento no Smith'), sets: 4, reps: '10-12' },
          { exercise: getExId('Leg Press Horizontal'), sets: 3, reps: '12' },
          { exercise: getExId('Cadeira Flexora'), sets: 4, reps: '12-15' },
          { exercise: getExId('Gêmeos no Leg Press'), sets: 4, reps: '15-20' },
        ]
      },
      {
        title: 'Upper B (Foco Hipertrofia e Pump)',
        exercises: [
          { exercise: getExId('Supino Inclinado com Halteres'), sets: 4, reps: '10-12' },
          { exercise: getExId('Pull-down na Polia Alta'), sets: 4, reps: '12-15' },
          { exercise: getExId('Crucifixo Reto com Halteres'), sets: 3, reps: '12-15' },
          { exercise: getExId('Remada Unilateral (Serrote)'), sets: 3, reps: '12' },
          { exercise: getExId('Elevação Lateral na Polia'), sets: 4, reps: '15' },
          { exercise: getExId('Tríceps Corda'), sets: 3, reps: '15' },
        ]
      }
    ]
  },
  {
    title: 'Superiores 2',
    description: 'Uma divisão de 3 dias focada EXCLUSIVAMENTE em superiores. Ideal para quem quer um dia específico para destruir os braços.',
    level: 'Intermediário',
    focus: 'Superiores',
    workouts: [
      {
        title: 'Treino A - Peito e Ombros',
        exercises: [
          { exercise: getExId('Supino Reto com Halteres'), sets: 4, reps: '8-10' },
          { exercise: getExId('Supino Inclinado com Barra'), sets: 3, reps: '10-12' },
          { exercise: getExId('Crossover (Polia Alta)'), sets: 3, reps: '12-15' },
          { exercise: getExId('Desenvolvimento com Barra'), sets: 3, reps: '10-12' },
          { exercise: getExId('Elevação Lateral com Halteres'), sets: 4, reps: '12-15' },
        ]
      },
      {
        title: 'Treino B - Costas e Core',
        exercises: [
          { exercise: getExId('Puxada Frontal (Pulldown)'), sets: 4, reps: '10-12' },
          { exercise: getExId('Remada Baixa com Triângulo'), sets: 4, reps: '10-12' },
          { exercise: getExId('Pullover'), sets: 3, reps: '12-15' },
          { exercise: getExId('Crucifixo Invertido (Peck Deck)'), sets: 3, reps: '15' },
          { exercise: getExId('Abdominal Infra (Elevação de Pernas)'), sets: 4, reps: '15' },
        ]
      },
      {
        title: 'Treino C - Braços Completos',
        exercises: [
          { exercise: getExId('Tríceps Pulley (Barra Reta/V)'), sets: 4, reps: '10-12' },
          { exercise: getExId('Rosca Direta com Barra W'), sets: 4, reps: '10-12' },
          { exercise: getExId('Tríceps Francês (Halter Único)'), sets: 3, reps: '12' },
          { exercise: getExId('Rosca Scott (Máquina/Barra)'), sets: 3, reps: '12' },
          { exercise: getExId('Tríceps Coice (Halter/Polia)'), sets: 3, reps: '15' },
          { exercise: getExId('Rosca Inversa (Barra/Polia)'), sets: 3, reps: '12' },
        ]
      }
    ]
  },

  // ==========================================
  // INTERMEDIÁRIO - FOCO: INFERIORES
  // ==========================================
  {
    title: 'Inferiores 1',
    description: 'Dois dias pesados de perna. Um focado em Quadríceps (parte frontal) e outro focado em Isquiotibiais e Glúteos (parte posterior).',
    level: 'Intermediário',
    focus: 'Inferiores',
    workouts: [
      {
        title: 'Pernas A (Foco Quadríceps)',
        exercises: [
          { exercise: getExId('Agachamento no Smith'), sets: 4, reps: '8-10' },
          { exercise: getExId('Leg Press 45º'), sets: 4, reps: '10-12', notes: 'Pés mais baixos na plataforma.' },
          { exercise: getExId('Passada / Avanço'), sets: 3, reps: '12 passos cada perna' },
          { exercise: getExId('Cadeira Extensora'), sets: 4, reps: '12-15', notes: 'Segure 1 segundo no topo.' },
          { exercise: getExId('Gêmeos em Pé no Smith'), sets: 4, reps: '15-20' },
        ]
      },
      {
        title: 'Superiores e Core (Recuperação)',
        exercises: [
          { exercise: getExId('Supino Reto com Halteres'), sets: 3, reps: '10-12' },
          { exercise: getExId('Puxada Frontal (Pulldown)'), sets: 3, reps: '10-12' },
          { exercise: getExId('Desenvolvimento Máquina'), sets: 3, reps: '12' },
          { exercise: getExId('Abdominal Supra na Polia'), sets: 4, reps: '15' },
        ]
      },
      {
        title: 'Pernas B (Foco Posterior e Glúteo)',
        exercises: [
          { exercise: getExId('Stiff com Barra'), sets: 4, reps: '10-12' },
          { exercise: getExId('Elevação Pélvica'), sets: 4, reps: '10-12' },
          { exercise: getExId('Mesa Flexora'), sets: 4, reps: '12-15' },
          { exercise: getExId('Cadeira Abdutora'), sets: 3, reps: '15-20' },
          { exercise: getExId('Gêmeos Sentado'), sets: 4, reps: '15-20' },
        ]
      }
    ]
  },

  // ==========================================
  // INTERMEDIÁRIO - FOCO: FORÇA
  // ==========================================
  {
    title: 'Força 1',
    description: 'Mistura o ganho de força bruta (exercícios base com repetições baixas e carga alta) com o ganho de massa (exercícios acessórios).',
    level: 'Intermediário',
    focus: 'Força',
    workouts: [
      {
        title: 'Treino A - Push Forte',
        exercises: [
          { exercise: getExId('Supino Reto com Barra'), sets: 5, reps: '4-6', notes: 'Carga alta. Descanse 2-3 minutos.' },
          { exercise: getExId('Desenvolvimento com Barra'), sets: 4, reps: '6-8' },
          { exercise: getExId('Supino Inclinado com Halteres'), sets: 3, reps: '8-10' },
          { exercise: getExId('Tríceps Testa com Barra W'), sets: 3, reps: '10-12' },
          { exercise: getExId('Abdominal Infra (Elevação de Pernas)'), sets: 3, reps: '15' },
        ]
      },
      {
        title: 'Treino B - Pull Forte',
        exercises: [
          { exercise: getExId('Remada Curvada com Barra'), sets: 5, reps: '6-8', notes: 'Mantenha o core muito rígido.' },
          { exercise: getExId('Barra Fixa (Pronada)'), sets: 4, reps: 'Falha', notes: 'Tente fazer pelo menos 6.' },
          { exercise: getExId('Remada Unilateral (Serrote)'), sets: 3, reps: '8-10' },
          { exercise: getExId('Rosca Direta com Barra Reta'), sets: 3, reps: '8-10' },
          { exercise: getExId('Encolhimento com Barra'), sets: 3, reps: '10-12' },
        ]
      },
      {
        title: 'Treino C - Legs Forte',
        exercises: [
          { exercise: getExId('Agachamento no Smith'), sets: 5, reps: '6-8', notes: 'Carga pesada. Descanse bem.' },
          { exercise: getExId('Leg Press 45º'), sets: 4, reps: '8-10' },
          { exercise: getExId('Stiff com Halteres'), sets: 4, reps: '8-10' },
          { exercise: getExId('Gêmeos em Pé no Smith'), sets: 4, reps: '12-15' },
          { exercise: getExId('Prancha Abdominal'), sets: 3, reps: '45s' },
        ]
      }
    ]
  }
];