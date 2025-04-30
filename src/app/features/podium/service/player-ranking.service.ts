import { Injectable, inject } from '@angular/core';
import { PlayersService } from '../../players/services/players.service';
import { OPScoreService } from './op-score.service';
import { TimeFrameUtils } from '../../../utils/time-frame.utils';

type PlayerRanking = {
  puuid: string;
  summonerName: string;
  category: 'top' | 'standard' | 'low';
  opScore: number;
  lastMatchStats: {
    kda: number;
    damageDealt: number;
    damageTaken: number;
    visionScore: number;
    csPerMin: number;
    win: boolean;
  };
};

@Injectable({
  providedIn: 'root'
})
export class PlayerRankingService {
  private playersService = inject(PlayersService);
  private opScoreService = inject(OPScoreService);

  // Método para obtener el ranking de un jugador en un período específico
  async getPlayerRanking(
    puuid: string,
    summonerName: string,
    timeFrame: 'day' | 'week' | 'month' = 'day'
  ): Promise<PlayerRanking | null> {
    try {
      const matchIds = await this.playersService.getMatchId(puuid).toPromise();
      if (!matchIds) return null;

      const filteredMatches = await this.filterMatchesByTimeFrame(matchIds, timeFrame);
      if (filteredMatches.length === 0) return null;

      const opScoreResult = await this.opScoreService.calculateOPScore(puuid, summonerName);

      return {
        puuid,
        summonerName,
        category: this.determineCategory(opScoreResult.opScore),
        opScore: opScoreResult.opScore,
        lastMatchStats: {
          kda: opScoreResult.kdaScore,
          damageDealt: opScoreResult.damageRatio,
          damageTaken: 0, // Podemos calcular esto si es necesario
          visionScore: opScoreResult.visionScore,
          csPerMin: opScoreResult.csPerMin,
          win: opScoreResult.winRate > 50
        }
      };
    } catch (error) {
      console.error('Error al calcular ranking:', error);
      return null;
    }
  }

  // Método para obtener los peores jugadores en un período
  async getWorstPlayers(timeFrame: 'day' | 'week' | 'month' = 'day', limit: number = 10): Promise<PlayerRanking[]> {
    const players = await this.getPlayersToAnalyze();

    const rankings = await Promise.all(
      players.map(player =>
        this.getPlayerRanking(player.puuid, player.summonerName, timeFrame)
      )
    );

    return rankings
      .filter((ranking): ranking is PlayerRanking => ranking !== null)
      .sort((a, b) => a.opScore - b.opScore)
      .slice(0, limit);
  }

  // Método para obtener los mejores jugadores en un período
  async getBestPlayers(timeFrame: 'day' | 'week' | 'month' = 'day', limit: number = 10): Promise<PlayerRanking[]> {
    const players = await this.getPlayersToAnalyze();

    const rankings = await Promise.all(
      players.map(player =>
        this.getPlayerRanking(player.puuid, player.summonerName, timeFrame)
      )
    );

    return rankings
      .filter((ranking): ranking is PlayerRanking => ranking !== null)
      .sort((a, b) => b.opScore - a.opScore)
      .slice(0, limit);
  }

  // Método para obtener jugadores por categoría
  async getPlayersByCategory(
    category: 'top' | 'standard' | 'low',
    timeFrame: 'day' | 'week' | 'month' = 'day',
    limit: number = 10
  ): Promise<PlayerRanking[]> {
    const players = await this.getPlayersToAnalyze();

    const rankings = await Promise.all(
      players.map(player =>
        this.getPlayerRanking(player.puuid, player.summonerName, timeFrame)
      )
    );

    return rankings
      .filter((ranking): ranking is PlayerRanking =>
        ranking !== null && ranking.category === category
      )
      .sort((a, b) => b.opScore - a.opScore)
      .slice(0, limit);
  }

  // Método para obtener la lista de jugadores a analizar
  private async getPlayersToAnalyze(): Promise<{ puuid: string; summonerName: string }[]> {
    return this.playersService.getPlayers();
  }

  private async filterMatchesByTimeFrame(matchIds: string[], timeFrame: 'day' | 'week' | 'month'): Promise<string[]> {
    const filteredMatches = [];
    for (const matchId of matchIds) {
      const matchInfo = await this.playersService.getInfoMatch(matchId).toPromise();
      if (!matchInfo) continue;

      if (TimeFrameUtils.isMatchInTimeFrame(matchInfo.info.gameEndTimestamp, timeFrame)) {
        filteredMatches.push(matchId);
      }
    }
    return filteredMatches;
  }

  private determineCategory(opScore: number): 'top' | 'standard' | 'low' {
    if (opScore >= 80) return 'top';
    if (opScore >= 50) return 'standard';
    return 'low';
  }
}
