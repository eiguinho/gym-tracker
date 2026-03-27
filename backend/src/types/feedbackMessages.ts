export interface FrequencyConfig {
  none: string[];
  low: string[];
  ideal: string[];
  extra: string[];
}

export const CONFIG = {
  MUSCLE_GROUPS: {
    superiores: ['Peito', 'Costas', 'Ombro', 'Bíceps', 'Tríceps', 'Trapézio', 'Antebraço'],
    inferiores: ['Quadríceps', 'Posterior', 'Glúteo', 'Panturrilha', 'Adutor'],
    core: ['Abdômen', 'Lombar']
  },
  RATIOS: {
    DISCREPANCY: 1.3,
    POSTURAL: 1.5,
    HARMONY: 2.0
  }
};

export const MESSAGES = {
  FREQUENCY: {
    iniciante: {
      none: ["A constância é o segredo. Vamos começar com um treino amanhã?", "O primeiro passo é o mais difícil. Que tal se exercitar hoje?"],
      low: ["Você está construindo o hábito. 1 ou 2 dias é melhor que zero, mantenha!", "Foco na regularidade. Cada dia de treino conta para sua adaptação."],
      ideal: ["Meta batida! 3 a 4 dias é o ponto ideal para consolidar seus resultados.", "Excelente! Essa frequência garante que seu corpo aprenda os movimentos."],
      extra: ["Cuidado com o entusiasmo! 5+ dias para quem começa pode ser exaustivo.", "Volume alto! Lembre-se que o descanso também faz parte do treino."]
    },
    intermediario: {
      none: ["Sua meta ideal é 4-5 dias. Tente ajustar a agenda na próxima semana.", "Ficar sem treinar prejudica sua progressão. Tente se organizar!"],
      low: ["Volume abaixo do esperado. 1 a 2 dias atrasa sua progressão de carga.", "Busque treinar pelo menos 3 a 4 dias para uma evolução real."],
      ideal: ["Consistência sólida! 3 a 5 dias é o ritmo perfeito para hipertrofia.", "Treino de alto nível. Essa frequência garante estímulo constante."],
      extra: ["Volume intenso! Com 6+ dias, certifique-se de que a dieta está acompanhando.", "Quase um atleta! Monitore sua fadiga para não estagnar."]
    },
    avancado: {
      none: ["Frequência baixa para seu nível. Avançados precisam de estímulo frequente.", "Risco de perda de rendimento. Volte aos treinos assim que possível."],
      low: ["Risco de desadaptação. Tente manter ao menos 4-5 estímulos semanais.", "Volume de manutenção. Para evoluir, você precisa de mais dias ativos."],
      ideal: ["Performance de elite. 4 a 6 dias é onde a mágica da periodização acontece.", "Gestão de volume impecável. Frequência ideal para um atleta avançado."],
      extra: ["Alerta de recuperação! Treinar 7 dias exige uma gestão de carga perfeita.", "Cuidado com o overtraining. Dias de descanso são essenciais."]
    }
  },
  FOCUS: {
    incoherent: ["Seu foco é {focus}, mas você priorizou {actual}. Ajuste o treino ou o perfil.", "Notamos que seu treino não condiz com seu foco em {focus}. Vamos reequilibrar?"],
    harmony: {
      iniciante: ["Bom trabalho, mas tente dar mais atenção para {muscle}.", "Para um desenvolvimento equilibrado, foque um pouco mais em {muscle}."],
      intermediario: ["Estrategicamente, {muscle} precisa de mais volume para acompanhar o resto.", "Seu desenvolvimento está bom, mas {muscle} está ficando para trás."],
      avancado: ["Refinamento técnico: o volume de {muscle} está subdimensionado nesta semana.", "Ajuste de simetria: aumente o volume de {muscle} para otimizar o shape."]
    },
    success: [
      "Perfeito! Seu volume de treino está totalmente alinhado com seu foco.",
      "Excelente distribuição muscular! Continue mantendo essa coerência nos treinos."
    ]
  },
  SLEEP: {
    bad_high: ["Seu sono ficou abaixo do ideal e o treino foi pesado. Priorize o descanso hoje.", "Risco de lesão elevado: durma mais ou reduza a intensidade esta semana."],
    bad_low: ["Seu sono ficou abaixo do ideal esta semana. Dormir melhor impactaria sua recuperação muscular.", "Recuperação lenta detectada. Tente priorizar o repouso esta noite."],
    med: ["Seu sono está razoável, mas ainda há espaço para melhorar a recuperação.", "Recuperação ok, mas você renderia muito mais com 1h extra de descanso."],
    good: ["Seu sono está ótimo e favorece uma recuperação mais eficiente.", "Estado anabólico otimizado. Aproveite o descanso para treinar forte amanhã."],
    none: ["Registre seu sono no app para receber insights valiosos de recuperação.", "Acompanhar seu sono é essencial para medir sua capacidade de recuperação."]
  }
};