export interface Exercise {
  _id: string;
  name: string;
  targetMuscles: string[];
  equipment: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  videoUrl?: string;
  gifUrl: string;
}