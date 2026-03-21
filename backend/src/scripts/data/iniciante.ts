import mongoose from 'mongoose';

export const getInicianteTemplates = (getExId: (name: string) => mongoose.Types.ObjectId) => [
  {
    title: 'Full Body 1',
    description: 'Treino completo para iniciantes com distribuição equilibrada em cada sessão.',
    level: 'Iniciante',
    focus: 'Full Body',
    workouts: [
      {
        title: 'Treino A - Base Geral',
        exercises: [
          { exercise: getExId('Leg Press 45º'), sets: 3, reps: '12-15' },
          { exercise: getExId('Supino Máquina Articulada'), sets: 3, reps: '12-15' },
          { exercise: getExId('Puxada Frontal (Pulldown)'), sets: 3, reps: '12-15' },
          { exercise: getExId('Desenvolvimento Máquina'), sets: 2, reps: '12' },
          { exercise: getExId('Prancha Abdominal'), sets: 3, reps: '30s' }
        ]
      },
      {
        title: 'Treino B - Progressão Inicial',
        exercises: [
          { exercise: getExId('Cadeira Extensora'), sets: 3, reps: '12-15' },
          { exercise: getExId('Crucifixo na Máquina (Peck Deck)'), sets: 3, reps: '12-15' },
          { exercise: getExId('Remada Máquina Articulada'), sets: 3, reps: '12-15' },
          { exercise: getExId('Rosca Direta na Polia'), sets: 2, reps: '12' },
          { exercise: getExId('Abdominal Supra (Crunch)'), sets: 3, reps: '15' }
        ]
      },
      {
        title: 'Treino C - Estabilidade Global',
        exercises: [
          { exercise: getExId('Mesa Flexora'), sets: 3, reps: '12-15' },
          { exercise: getExId('Flexão de Braços'), sets: 3, reps: '10-12' },
          { exercise: getExId('Puxada com Triângulo'), sets: 3, reps: '12-15' },
          { exercise: getExId('Tríceps Corda'), sets: 2, reps: '12' },
          { exercise: getExId('Gêmeos Sentado'), sets: 3, reps: '15-20' }
        ]
      }
    ]
  },

  {
    title: 'Full Body 2',
    description: 'Treino global simples com foco em adaptação muscular.',
    level: 'Iniciante',
    focus: 'Full Body',
    workouts: [
      {
        title: 'Treino A - Força Inicial',
        exercises: [
          { exercise: getExId('Leg Press Horizontal'), sets: 3, reps: '12' },
          { exercise: getExId('Supino Máquina Articulada'), sets: 3, reps: '12' },
          { exercise: getExId('Remada Máquina Articulada'), sets: 3, reps: '12' },
          { exercise: getExId('Elevação Lateral com Halteres'), sets: 2, reps: '12' },
          { exercise: getExId('Prancha Abdominal'), sets: 3, reps: '30s' }
        ]
      },
      {
        title: 'Treino B - Coordenação Global',
        exercises: [
          { exercise: getExId('Cadeira Flexora'), sets: 3, reps: '12' },
          { exercise: getExId('Crucifixo na Máquina (Peck Deck)'), sets: 3, reps: '12' },
          { exercise: getExId('Puxada Frontal (Pulldown)'), sets: 3, reps: '12' },
          { exercise: getExId('Tríceps Pulley (Barra Reta/V)'), sets: 2, reps: '12' },
          { exercise: getExId('Abdominal Supra (Crunch)'), sets: 3, reps: '15' }
        ]
      },
      {
        title: 'Treino C - Continuidade',
        exercises: [
          { exercise: getExId('Cadeira Abdutora'), sets: 3, reps: '15' },
          { exercise: getExId('Flexão de Braços'), sets: 3, reps: '10' },
          { exercise: getExId('Puxada com Triângulo'), sets: 3, reps: '12' },
          { exercise: getExId('Rosca Martelo com Halteres'), sets: 2, reps: '12' },
          { exercise: getExId('Gêmeos Sentado'), sets: 3, reps: '15' }
        ]
      }
    ]
  },

  {
    title: 'Full Body 3',
    description: 'Treino completo com estímulo global e progressão segura.',
    level: 'Iniciante',
    focus: 'Full Body',
    workouts: [
      {
        title: 'Treino A - Base de Máquina',
        exercises: [
          { exercise: getExId('Leg Press 45º'), sets: 3, reps: '12' },
          { exercise: getExId('Supino Máquina Articulada'), sets: 3, reps: '12' },
          { exercise: getExId('Puxada Frontal (Pulldown)'), sets: 3, reps: '12' },
          { exercise: getExId('Desenvolvimento Máquina'), sets: 2, reps: '12' },
          { exercise: getExId('Prancha Abdominal'), sets: 3, reps: '30s' }
        ]
      },
      {
        title: 'Treino B - Controle Muscular',
        exercises: [
          { exercise: getExId('Mesa Flexora'), sets: 3, reps: '12' },
          { exercise: getExId('Crucifixo na Máquina (Peck Deck)'), sets: 3, reps: '12' },
          { exercise: getExId('Remada Máquina Articulada'), sets: 3, reps: '12' },
          { exercise: getExId('Rosca Direta na Polia'), sets: 2, reps: '12' },
          { exercise: getExId('Abdominal Supra (Crunch)'), sets: 3, reps: '15' }
        ]
      },
      {
        title: 'Treino C - Consolidação',
        exercises: [
          { exercise: getExId('Cadeira Extensora'), sets: 3, reps: '15' },
          { exercise: getExId('Flexão de Braços'), sets: 3, reps: '10' },
          { exercise: getExId('Puxada com Triângulo'), sets: 3, reps: '12' },
          { exercise: getExId('Tríceps Corda'), sets: 2, reps: '12' },
          { exercise: getExId('Gêmeos Sentado'), sets: 3, reps: '15-20' }
        ]
      }
    ]
  },
  {
    title: 'Superiores 1',
    description: 'Treino de membros superiores com base em máquinas e movimentos simples.',
    level: 'Iniciante',
    focus: 'Superiores',
    workouts: [
      {
        title: 'Treino A - Peito e Costas',
        exercises: [
          { exercise: getExId('Supino Máquina Articulada'), sets: 3, reps: '12-15' },
          { exercise: getExId('Crucifixo na Máquina (Peck Deck)'), sets: 3, reps: '12-15' },
          { exercise: getExId('Puxada Frontal (Pulldown)'), sets: 3, reps: '12-15' },
          { exercise: getExId('Remada Máquina Articulada'), sets: 3, reps: '12-15' },
          { exercise: getExId('Prancha Abdominal'), sets: 3, reps: '30s' }
        ]
      },
      {
        title: 'Treino B - Ombros e Braços',
        exercises: [
          { exercise: getExId('Desenvolvimento Máquina'), sets: 3, reps: '12' },
          { exercise: getExId('Elevação Lateral com Halteres'), sets: 3, reps: '12' },
          { exercise: getExId('Rosca Direta na Polia'), sets: 3, reps: '12' },
          { exercise: getExId('Tríceps Corda'), sets: 3, reps: '12' },
          { exercise: getExId('Abdominal Supra (Crunch)'), sets: 3, reps: '15' }
        ]
      },
      {
        title: 'Treino C - Costas e Complementar',
        exercises: [
          { exercise: getExId('Puxada com Triângulo'), sets: 3, reps: '12-15' },
          { exercise: getExId('Remada Baixa com Triângulo'), sets: 3, reps: '12-15' },
          { exercise: getExId('Flexão de Braços'), sets: 3, reps: '10-12' },
          { exercise: getExId('Rosca Martelo com Halteres'), sets: 2, reps: '12' },
          { exercise: getExId('Tríceps Pulley (Barra Reta/V)'), sets: 2, reps: '12' }
        ]
      },
      {
        title: 'Treino D - Inferiores Completo',
        exercises: [
            { exercise: getExId('Leg Press 45º'), sets: 3, reps: '12-15' },
            { exercise: getExId('Cadeira Extensora'), sets: 3, reps: '12-15' },
            { exercise: getExId('Mesa Flexora'), sets: 3, reps: '12-15' },
            { exercise: getExId('Cadeira Abdutora'), sets: 3, reps: '15' },
            { exercise: getExId('Gêmeos Sentado'), sets: 3, reps: '15-20' }
        ]
      }
    ]
  },

  {
    title: 'Superiores 2',
    description: 'Treino superior com distribuição equilibrada entre empurrar e puxar.',
    level: 'Iniciante',
    focus: 'Superiores',
    workouts: [
      {
        title: 'Treino A - Base Superior',
        exercises: [
          { exercise: getExId('Supino Máquina Articulada'), sets: 3, reps: '12' },
          { exercise: getExId('Puxada Frontal (Pulldown)'), sets: 3, reps: '12' },
          { exercise: getExId('Desenvolvimento Máquina'), sets: 3, reps: '12' },
          { exercise: getExId('Rosca Direta na Polia'), sets: 2, reps: '12' },
          { exercise: getExId('Tríceps Corda'), sets: 2, reps: '12' }
        ]
      },
      {
        title: 'Treino B - Peito e Ombros',
        exercises: [
          { exercise: getExId('Crucifixo na Máquina (Peck Deck)'), sets: 3, reps: '12' },
          { exercise: getExId('Flexão de Braços'), sets: 3, reps: '10' },
          { exercise: getExId('Elevação Lateral com Halteres'), sets: 3, reps: '12' },
          { exercise: getExId('Elevação Frontal com Halteres'), sets: 2, reps: '12' },
          { exercise: getExId('Abdominal Supra (Crunch)'), sets: 3, reps: '15' }
        ]
      },
      {
        title: 'Treino C - Costas e Braços',
        exercises: [
          { exercise: getExId('Remada Máquina Articulada'), sets: 3, reps: '12' },
          { exercise: getExId('Puxada com Triângulo'), sets: 3, reps: '12' },
          { exercise: getExId('Rosca Martelo com Halteres'), sets: 3, reps: '12' },
          { exercise: getExId('Tríceps Pulley (Barra Reta/V)'), sets: 3, reps: '12' },
          { exercise: getExId('Prancha Abdominal'), sets: 3, reps: '30s' }
        ]
      },
      {
        title: 'Treino D - Inferiores Completo',
        exercises: [
            { exercise: getExId('Leg Press 45º'), sets: 3, reps: '12-15' },
            { exercise: getExId('Cadeira Extensora'), sets: 3, reps: '12-15' },
            { exercise: getExId('Mesa Flexora'), sets: 3, reps: '12-15' },
            { exercise: getExId('Cadeira Abdutora'), sets: 3, reps: '15' },
            { exercise: getExId('Gêmeos Sentado'), sets: 3, reps: '15-20' }
        ]
      }
    ]
  },
  {
    title: 'Superiores 3',
    description: 'Treino superior para adaptação muscular com foco em execução segura.',
    level: 'Iniciante',
    focus: 'Superiores',
    workouts: [
      {
        title: 'Treino A - Peito e Tríceps',
        exercises: [
          { exercise: getExId('Supino Máquina Articulada'), sets: 3, reps: '12-15' },
          { exercise: getExId('Crucifixo na Máquina (Peck Deck)'), sets: 3, reps: '12-15' },
          { exercise: getExId('Tríceps Corda'), sets: 3, reps: '12' },
          { exercise: getExId('Tríceps Pulley (Barra Reta/V)'), sets: 2, reps: '12' },
          { exercise: getExId('Abdominal Supra (Crunch)'), sets: 3, reps: '15' }
        ]
      },
      {
        title: 'Treino B - Costas e Bíceps',
        exercises: [
          { exercise: getExId('Puxada Frontal (Pulldown)'), sets: 3, reps: '12-15' },
          { exercise: getExId('Remada Máquina Articulada'), sets: 3, reps: '12-15' },
          { exercise: getExId('Rosca Direta na Polia'), sets: 3, reps: '12' },
          { exercise: getExId('Rosca Martelo com Halteres'), sets: 2, reps: '12' },
          { exercise: getExId('Prancha Abdominal'), sets: 3, reps: '30s' }
        ]
      },
      {
        title: 'Treino C - Ombros e Complementar',
        exercises: [
          { exercise: getExId('Desenvolvimento Máquina'), sets: 3, reps: '12' },
          { exercise: getExId('Elevação Lateral com Halteres'), sets: 3, reps: '12' },
          { exercise: getExId('Elevação Frontal com Halteres'), sets: 2, reps: '12' },
          { exercise: getExId('Flexão de Braços'), sets: 3, reps: '10' },
          { exercise: getExId('Crucifixo Invertido (Peck Deck)'), sets: 2, reps: '12' }
        ]
      },
      {
        title: 'Treino D - Inferiores Completo',
        exercises: [
            { exercise: getExId('Leg Press 45º'), sets: 3, reps: '12-15' },
            { exercise: getExId('Cadeira Extensora'), sets: 3, reps: '12-15' },
            { exercise: getExId('Mesa Flexora'), sets: 3, reps: '12-15' },
            { exercise: getExId('Cadeira Abdutora'), sets: 3, reps: '15' },
            { exercise: getExId('Gêmeos Sentado'), sets: 3, reps: '15-20' }
        ]
      }
    ]
  },
  {
    title: 'Inferiores 1',
    description: 'Treino de pernas em 3 dias com divisão equilibrada.',
    level: 'Iniciante',
    focus: 'Inferiores',
    workouts: [
        {
        title: 'Treino A - Quadríceps',
        exercises: [
            { exercise: getExId('Leg Press 45º'), sets: 3, reps: '12-15' },
            { exercise: getExId('Cadeira Extensora'), sets: 3, reps: '12-15' },
            { exercise: getExId('Agachamento no Smith'), sets: 3, reps: '12' },
            { exercise: getExId('Gêmeos Sentado'), sets: 3, reps: '15-20' }
        ]
        },
        {
        title: 'Treino B - Posterior e Glúteos',
        exercises: [
            { exercise: getExId('Mesa Flexora'), sets: 3, reps: '12-15' },
            { exercise: getExId('Stiff com Halteres'), sets: 3, reps: '12' },
            { exercise: getExId('Cadeira Abdutora'), sets: 3, reps: '15' },
            { exercise: getExId('Gêmeos no Leg Press'), sets: 3, reps: '15' }
        ]
        },
        {
        title: 'Treino C - Completo',
        exercises: [
            { exercise: getExId('Leg Press Horizontal'), sets: 3, reps: '12' },
            { exercise: getExId('Cadeira Flexora'), sets: 3, reps: '12' },
            { exercise: getExId('Cadeira Adutora'), sets: 3, reps: '15' },
            { exercise: getExId('Elevação Pélvica'), sets: 3, reps: '12' }
        ]
        }
    ]
  },
  {
    title: 'Inferiores 2',
    description: 'Treino de pernas em 4 dias com melhor distribuição muscular.',
    level: 'Iniciante',
    focus: 'Inferiores',
    workouts: [
        {
        title: 'Treino A - Quadríceps',
        exercises: [
            { exercise: getExId('Leg Press 45º'), sets: 3, reps: '12' },
            { exercise: getExId('Cadeira Extensora'), sets: 3, reps: '15' },
            { exercise: getExId('Gêmeos Sentado'), sets: 3, reps: '15' }
        ]
        },
        {
        title: 'Treino B - Posterior',
        exercises: [
            { exercise: getExId('Mesa Flexora'), sets: 3, reps: '12' },
            { exercise: getExId('Stiff com Halteres'), sets: 3, reps: '12' },
            { exercise: getExId('Gêmeos no Leg Press'), sets: 3, reps: '15' }
        ]
        },
        {
        title: 'Treino C - Glúteos',
        exercises: [
            { exercise: getExId('Elevação Pélvica'), sets: 3, reps: '12' },
            { exercise: getExId('Cadeira Abdutora'), sets: 3, reps: '15' },
            { exercise: getExId('Passada / Avanço'), sets: 3, reps: '12' }
        ]
        },
        {
        title: 'Treino D - Complementar',
        exercises: [
            { exercise: getExId('Leg Press Horizontal'), sets: 3, reps: '12' },
            { exercise: getExId('Cadeira Adutora'), sets: 3, reps: '15' },
            { exercise: getExId('Cadeira Flexora'), sets: 3, reps: '12' }
        ]
        }
    ]
  },
  {
    title: 'Inferiores 3',
    description: 'Treino de pernas em 5 dias com foco detalhado por região.',
    level: 'Iniciante',
    focus: 'Inferiores',
    workouts: [
        {
        title: 'Treino A - Quadríceps Principal',
        exercises: [
            { exercise: getExId('Leg Press 45º'), sets: 3, reps: '12' },
            { exercise: getExId('Cadeira Extensora'), sets: 3, reps: '15' }
        ]
        },
        {
        title: 'Treino B - Posterior Principal',
        exercises: [
            { exercise: getExId('Mesa Flexora'), sets: 3, reps: '12' },
            { exercise: getExId('Stiff com Halteres'), sets: 3, reps: '12' }
        ]
        },
        {
        title: 'Treino C - Glúteos',
        exercises: [
            { exercise: getExId('Elevação Pélvica'), sets: 3, reps: '12' },
            { exercise: getExId('Cadeira Abdutora'), sets: 3, reps: '15' }
        ]
        },
        {
        title: 'Treino D - Adutores e Estabilidade',
        exercises: [
            { exercise: getExId('Cadeira Adutora'), sets: 3, reps: '15' },
            { exercise: getExId('Passada / Avanço'), sets: 3, reps: '12' }
        ]
        },
        {
        title: 'Treino E - Panturrilhas',
        exercises: [
            { exercise: getExId('Gêmeos Sentado'), sets: 4, reps: '15-20' },
            { exercise: getExId('Gêmeos no Leg Press'), sets: 4, reps: '15-20' }
        ]
        }
    ]
  },
  {
    title: 'PPL 1',
    description: 'Divisão clássica Push Pull Legs com foco em adaptação e execução simples.',
    level: 'Iniciante',
    focus: 'PPL',
    workouts: [
        {
        title: 'Treino A - Push',
        exercises: [
            { exercise: getExId('Supino Máquina Articulada'), sets: 3, reps: '12-15' },
            { exercise: getExId('Crucifixo na Máquina (Peck Deck)'), sets: 3, reps: '12-15' },
            { exercise: getExId('Desenvolvimento Máquina'), sets: 3, reps: '12' },
            { exercise: getExId('Tríceps Corda'), sets: 3, reps: '12' }
        ]
        },
        {
        title: 'Treino B - Pull',
        exercises: [
            { exercise: getExId('Puxada Frontal (Pulldown)'), sets: 3, reps: '12-15' },
            { exercise: getExId('Remada Máquina Articulada'), sets: 3, reps: '12-15' },
            { exercise: getExId('Rosca Direta na Polia'), sets: 3, reps: '12' },
            { exercise: getExId('Rosca Martelo com Halteres'), sets: 2, reps: '12' }
        ]
        },
        {
        title: 'Treino C - Legs',
        exercises: [
            { exercise: getExId('Leg Press 45º'), sets: 3, reps: '12-15' },
            { exercise: getExId('Cadeira Extensora'), sets: 3, reps: '12-15' },
            { exercise: getExId('Mesa Flexora'), sets: 3, reps: '12-15' },
            { exercise: getExId('Gêmeos Sentado'), sets: 3, reps: '15-20' }
        ]
        }
    ]
  },
  {
    title: 'PPL 2',
    description: 'Divisão Push Pull Legs com variação de estímulos e máquinas.',
    level: 'Iniciante',
    focus: 'PPL',
    workouts: [
        {
        title: 'Treino A - Push',
        exercises: [
            { exercise: getExId('Flexão de Braços'), sets: 3, reps: '10-12' },
            { exercise: getExId('Supino Máquina Articulada'), sets: 3, reps: '12' },
            { exercise: getExId('Elevação Lateral com Halteres'), sets: 3, reps: '12' },
            { exercise: getExId('Tríceps Pulley (Barra Reta/V)'), sets: 3, reps: '12' }
        ]
        },
        {
        title: 'Treino B - Pull',
        exercises: [
            { exercise: getExId('Puxada com Triângulo'), sets: 3, reps: '12' },
            { exercise: getExId('Remada Baixa com Triângulo'), sets: 3, reps: '12' },
            { exercise: getExId('Rosca Martelo com Halteres'), sets: 3, reps: '12' },
            { exercise: getExId('Crucifixo Invertido (Peck Deck)'), sets: 2, reps: '12' }
        ]
        },
        {
        title: 'Treino C - Legs',
        exercises: [
            { exercise: getExId('Leg Press Horizontal'), sets: 3, reps: '12' },
            { exercise: getExId('Cadeira Flexora'), sets: 3, reps: '12' },
            { exercise: getExId('Cadeira Abdutora'), sets: 3, reps: '15' },
            { exercise: getExId('Gêmeos no Leg Press'), sets: 3, reps: '15-20' }
        ]
        }
    ]
  },
  {
    title: 'Força 1',
    description: 'Treino com foco em força inicial e execução controlada.',
    level: 'Iniciante',
    focus: 'Força',
    workouts: [
        {
        title: 'Treino A - Empurrar',
        exercises: [
            { exercise: getExId('Supino Máquina Articulada'), sets: 4, reps: '6-8' },
            { exercise: getExId('Desenvolvimento Máquina'), sets: 4, reps: '6-8' },
            { exercise: getExId('Tríceps Pulley (Barra Reta/V)'), sets: 3, reps: '8-10' }
        ]
        },
        {
        title: 'Treino B - Puxar',
        exercises: [
            { exercise: getExId('Puxada Frontal (Pulldown)'), sets: 4, reps: '6-8' },
            { exercise: getExId('Remada Máquina Articulada'), sets: 4, reps: '6-8' },
            { exercise: getExId('Rosca Direta na Polia'), sets: 3, reps: '8-10' }
        ]
        },
        {
        title: 'Treino C - Inferiores',
        exercises: [
            { exercise: getExId('Leg Press 45º'), sets: 4, reps: '6-8' },
            { exercise: getExId('Mesa Flexora'), sets: 3, reps: '8-10' },
            { exercise: getExId('Gêmeos Sentado'), sets: 3, reps: '12-15' }
        ]
        }
    ]
  },
  {
    title: 'Força 2',
    description: 'Treino de força com base em movimentos principais e progressão simples.',
    level: 'Iniciante',
    focus: 'Força',
    workouts: [
        {
        title: 'Treino A - Peito e Ombros',
        exercises: [
            { exercise: getExId('Supino Máquina Articulada'), sets: 4, reps: '5-7' },
            { exercise: getExId('Flexão de Braços'), sets: 3, reps: '8-10' },
            { exercise: getExId('Desenvolvimento Máquina'), sets: 4, reps: '6-8' }
        ]
        },
        {
        title: 'Treino B - Costas e Bíceps',
        exercises: [
            { exercise: getExId('Puxada com Triângulo'), sets: 4, reps: '6-8' },
            { exercise: getExId('Remada Baixa com Triângulo'), sets: 4, reps: '6-8' },
            { exercise: getExId('Rosca Martelo com Halteres'), sets: 3, reps: '8-10' }
        ]
        },
        {
        title: 'Treino C - Pernas',
        exercises: [
            { exercise: getExId('Leg Press Horizontal'), sets: 4, reps: '6-8' },
            { exercise: getExId('Cadeira Extensora'), sets: 3, reps: '8-10' },
            { exercise: getExId('Cadeira Flexora'), sets: 3, reps: '8-10' }
        ]
        }
    ]
  }
];