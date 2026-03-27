import { Feedback, WorkoutLogForFeedback, SleepDataSummary } from '../types/dashboard';
import { IUser } from '../models/User';
import { CONFIG, MESSAGES, FrequencyConfig } from '../types/feedbackMessages';

export class FeedbackEngine {
 static generate(
    workoutLogs: WorkoutLogForFeedback[],
    muscleData: { subject: string; A: number }[],
    sleepData: SleepDataSummary,
    user: IUser
  ): Feedback[] {
    const feedbacks: Feedback[] = [];
    const days = workoutLogs.length;

    const level = this.normalizeString(user.level || 'iniciante');
    const focus = this.normalizeString(user.focus || 'hipertrofia_geral');

    feedbacks.push(this.analyzeFrequency(days, level));
    feedbacks.push(this.analyzeGoalAlignment(muscleData, focus, level));
    feedbacks.push(this.analyzeRecovery(sleepData, days));
    
    return feedbacks;
  }

  private static normalizeString(str: string): string {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("ç", "c");
  }

  private static pick(messages: string[]): string {
    if (!messages || messages.length === 0) return "Continue focado no seu progresso!";
    return messages[Math.floor(Math.random() * messages.length)];
  }

  private static analyzeFrequency(days: number, level: string): Feedback {
    const config = MESSAGES.FREQUENCY[level as keyof typeof MESSAGES.FREQUENCY] || MESSAGES.FREQUENCY.iniciante;
    let category: keyof FrequencyConfig = 'none';

    if (level === 'iniciante') {
      category = days === 0 ? 'none' : days <= 2 ? 'low' : days <= 4 ? 'ideal' : 'extra';
    } else if (level === 'intermediario') {
      category = days === 0 ? 'none' : days <= 2 ? 'low' : days <= 5 ? 'ideal' : 'extra';
    } else {
      category = days === 0 ? 'none' : days <= 3 ? 'low' : days <= 6 ? 'ideal' : 'extra';
    }

    const type = category === 'ideal' ? 'success' : category === 'none' ? 'warning' : 'info';
    const icon = category === 'ideal' ? 'fire' : category === 'none' ? 'alert' : 'calendar';

    return { type, message: this.pick(config[category]), icon };
  }

  private static analyzeGoalAlignment(muscleData: { subject: string; A: number }[], focus: string, level: string): Feedback {
    if (muscleData.length === 0) {
      return { type: 'info', message: "Faça seu primeiro treino para avaliarmos seu alinhamento muscular.", icon: 'target' };
    }

    const upper = muscleData.filter(m => CONFIG.MUSCLE_GROUPS.superiores.includes(m.subject)).reduce((s, m) => s + m.A, 0);
    const lower = muscleData.filter(m => CONFIG.MUSCLE_GROUPS.inferiores.includes(m.subject)).reduce((s, m) => s + m.A, 0);

    if (focus === 'superiores' && lower > upper && lower > 0) {
      return { type: 'warning', message: this.pick(MESSAGES.FOCUS.incoherent).replace('{focus}', 'Superiores').replace('{actual}', 'Inferiores'), icon: 'target' };
    } 
    if (focus === 'inferiores' && upper > lower && upper > 0) {
      return { type: 'warning', message: this.pick(MESSAGES.FOCUS.incoherent).replace('{focus}', 'Inferiores').replace('{actual}', 'Superiores'), icon: 'target' };
    }

    const getVol = (mName: string) => muscleData.find(m => m.subject === mName)?.A || 0;
    if (getVol('Peito') > getVol('Costas') * CONFIG.RATIOS.POSTURAL && getVol('Peito') > 4) {
      return { type: 'warning', message: "Equilíbrio Postural: Seu volume de empurrar está muito superior ao de puxar. Fortaleça as Costas.", icon: 'alert' };
    }
    if (getVol('Quadríceps') > getVol('Posterior') * CONFIG.RATIOS.POSTURAL && getVol('Quadríceps') > 4) {
      return { type: 'warning', message: "Atenção: Quadríceps dominantes detectados. Aumente o volume de Posterior para proteger seus joelhos.", icon: 'alert' };
    }

    const list = focus === 'superiores' ? CONFIG.MUSCLE_GROUPS.superiores : 
                 focus === 'inferiores' ? CONFIG.MUSCLE_GROUPS.inferiores : 
                 [...CONFIG.MUSCLE_GROUPS.superiores, ...CONFIG.MUSCLE_GROUPS.inferiores];

    const focusData = muscleData.filter(m => list.includes(m.subject)).sort((a, b) => b.A - a.A);
    
    if (focusData.length >= 2) {
      const [most, least] = [focusData[0], focusData[focusData.length - 1]];
      if (most.A > least.A * CONFIG.RATIOS.HARMONY) {
        const msgList = MESSAGES.FOCUS.harmony[level as keyof typeof MESSAGES.FOCUS.harmony] || MESSAGES.FOCUS.harmony.iniciante;
        return { type: 'info', message: this.pick(msgList).replace('{muscle}', least.subject), icon: 'zap' };
      }
    }

    return { type: 'success', message: this.pick(MESSAGES.FOCUS.success), icon: 'target' };
  }

  private static analyzeRecovery(sleep: SleepDataSummary, days: number): Feedback {
    if (!sleep.hasLogs) {
      return { type: 'info', message: this.pick(MESSAGES.SLEEP.none), icon: 'moon' };
    }
    if (sleep.score < 55) {
      const msg = days >= 4 ? MESSAGES.SLEEP.bad_high : MESSAGES.SLEEP.bad_low;
      return { type: 'warning', message: this.pick(msg), icon: 'bed' };
    }
    if (sleep.score < 75) return { type: 'info', message: this.pick(MESSAGES.SLEEP.med), icon: 'moon' };
    return { type: 'success', message: this.pick(MESSAGES.SLEEP.good), icon: 'moon' };
  }
}