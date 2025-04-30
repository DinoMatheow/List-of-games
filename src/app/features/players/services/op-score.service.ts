import { Injectable } from '@angular/core';
import { PlayersService } from './players.service';
import { MatchInfo } from '../interfaces/matchs-info/match-info.interface';

@Injectable({
  providedIn: 'root'
})
export class OPScoreService {
  constructor(private playersService: PlayersService) {}

  // Método para calcular el OP_Score de un jugador
  async calculateOPScore(puuid: string, summonerName: string) {
    // 1. Obtener los IDs de las partidas del jugador
    const matchIds = await this.playersService.getMatchId(puuid).toPromise();

    if (!matchIds || matchIds.length === 0) {
      throw new Error('No se encontraron partidas para el jugador');
    }

    // Variables para acumular las estadísticas
    let totalKdaScore = 0;
    let totalKillParticipation = 0;
    let totalCsPerMin = 0;
    let totalDamageRatio = 0;
    let totalVisionScore = 0;
    let totalWins = 0;
    let matchesAnalyzed = 0;

    // 2. Analizar cada partida
    for (const matchId of matchIds) {
      const matchInfo = await this.playersService.getInfoMatch(matchId).toPromise();
      if (!matchInfo) continue;

      // Encontrar al jugador en la partida
      const participant = matchInfo.info.participants.find(p => p.puuid === puuid);
      if (!participant) continue;

      // 2.1 Calcular KDA Score
      const kdaScore = (participant.kills + participant.assists) / (participant.deaths || 1);
      totalKdaScore += kdaScore;

      // 2.2 Calcular Kill Participation
      const teamKills = matchInfo.info.participants
        .filter(p => p.teamId === participant.teamId)
        .reduce((sum, p) => sum + p.kills, 0);
      const killParticipation = teamKills > 0
        ? ((participant.kills + participant.assists) / teamKills) * 100
        : 0;
      totalKillParticipation += killParticipation;

      // 2.3 Calcular CS por minuto
      const gameDurationInMinutes = matchInfo.info.gameDuration / 60;
      const csPerMin = participant.totalMinionsKilled / gameDurationInMinutes;
      totalCsPerMin += csPerMin;

      // 2.4 Calcular Ratio de daño
      const damageRatio = participant.totalDamageDealtToChampions /
        (participant.totalDamageTaken || 1);
      totalDamageRatio += damageRatio;

      // 2.5 Acumular Vision Score
      totalVisionScore += participant.visionScore;

      // 2.6 Contar victorias
      if (participant.win) {
        totalWins++;
      }

      matchesAnalyzed++;
    }

    if (matchesAnalyzed === 0) {
      throw new Error('No se pudieron analizar partidas');
    }

    // 3. Calcular promedios
    const avgKdaScore = totalKdaScore / matchesAnalyzed;
    const avgKillParticipation = totalKillParticipation / matchesAnalyzed;
    const avgCsPerMin = totalCsPerMin / matchesAnalyzed;
    const avgDamageRatio = totalDamageRatio / matchesAnalyzed;
    const avgVisionScore = totalVisionScore / matchesAnalyzed;
    const winRate = totalWins / matchesAnalyzed;
    const winBonus = winRate * 10; // Bonus de 0-10 basado en winrate

    // 4. Calcular OP Score final usando la fórmula proporcionada
    const opScore = (avgKdaScore * 0.35) +
      (avgKillParticipation * 0.25) +
      (avgCsPerMin * 0.15) +
      (avgDamageRatio * 0.1) +
      (avgVisionScore * 0.05) +
      winBonus;

    // 5. Devolver los resultados
    return {
      puuid,
      summonerName,
      kdaScore: avgKdaScore,
      killParticipation: avgKillParticipation,
      csPerMin: avgCsPerMin,
      damageRatio: avgDamageRatio,
      visionScore: avgVisionScore,
      winBonus,
      opScore,
      matchesAnalyzed,
      winRate: winRate * 100 // Convertir a porcentaje
    };
  }
}
