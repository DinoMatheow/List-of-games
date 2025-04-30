import { MatchInfo } from '../features/players/interfaces/matchs-info/match-info.interface';

export class RankingCalculator {
  // Calcular la posición de un jugador en una partida
  static calculatePlayerPosition(match: MatchInfo, puuid: string): number {
    const participants = match.info.participants;
    const sortedParticipants = [...participants].sort((a, b) => {
      const scoreA = this.calculatePlayerScore(a);
      const scoreB = this.calculatePlayerScore(b);
      return scoreB - scoreA;
    });

    return sortedParticipants.findIndex(p => p.puuid === puuid) + 1;
  }

  // Calcular la puntuación de un jugador
  static calculatePlayerScore(participant: any): number {
    return (participant.kills + participant.assists) * 2 -
           participant.deaths +
           participant.totalDamageDealtToChampions / 1000;
  }

  // Calcular estadísticas de una partida
  static calculateMatchStats(participant: any, gameDuration: number) {
    const gameDurationInMinutes = gameDuration / 60;
    return {
      kda: (participant.kills + participant.assists) / (participant.deaths || 1),
      damageDealt: participant.totalDamageDealtToChampions,
      damageTaken: participant.totalDamageTaken,
      visionScore: participant.visionScore,
      csPerMin: participant.totalMinionsKilled / gameDurationInMinutes,
      win: participant.win
    };
  }

  // Determinar la categoría del jugador
  static determineCategory(
    topMatches: number,
    standardMatches: number,
    lowMatches: number,
    totalMatches: number
  ): 'top' | 'standard' | 'low' {
    const topPercentage = (topMatches / totalMatches) * 100;
    const lowPercentage = (lowMatches / totalMatches) * 100;

    if (topPercentage >= 40) return 'top';
    if (lowPercentage >= 40) return 'low';
    return 'standard';
  }

  // Calcular puntuación de rendimiento
  static calculatePerformanceScore(
    topMatches: number,
    standardMatches: number,
    lowMatches: number,
    totalMatches: number
  ): number {
    const topScore = topMatches * 3;
    const standardScore = standardMatches * 2;
    const lowScore = lowMatches * 1;
    const totalScore = topScore + standardScore + lowScore;
    return (totalScore / (totalMatches * 3)) * 100;
  }
}
