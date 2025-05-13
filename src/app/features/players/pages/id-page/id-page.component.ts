import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { PlayerRankingService } from '../../../podium/service/player-ranking.service';

@Component({
  selector: 'app-id-page',
  standalone: true,
  imports: [],
  templateUrl: './id-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdPageComponent {
  private playersService = inject(PlayersService);
  private playerRankingService = inject(PlayerRankingService);

  // Variables para almacenar los rankings
  playerRanking: any = null;
  worstPlayers: any[] = [];
  bestPlayers: any[] = [];
  loading = false;
  error = '';

  // Método para obtener el ranking de un jugador
  async getPlayerRanking(puuid: string, summonerName: string) {
    this.loading = true;
    this.error = '';
    try {
      this.playerRanking = await this.playerRankingService.getPlayerRanking(puuid, summonerName);
    } catch (error) {
      this.error = 'Error al obtener el ranking del jugador';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  // Método para obtener los peores jugadores
  async getWorstPlayers() {
    this.loading = true;
    this.error = '';
    try {
      this.worstPlayers = await this.playerRankingService.getWorstPlayers();
    } catch (error) {
      this.error = 'Error al obtener los peores jugadores';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  // Método para obtener los mejores jugadores
  async getBestPlayers() {
    this.loading = true;
    this.error = '';
    try {
      this.bestPlayers = await this.playerRankingService.getBestPlayers();
    } catch (error) {
      this.error = 'Error al obtener los mejores jugadores';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  // Método para obtener jugadores por categoría
  async getPlayersByCategory(category: 'top' | 'standard' | 'low') {
    this.loading = true;
    this.error = '';
    try {
      const players = await this.playerRankingService.getPlayersByCategory(category);
      // Aquí puedes manejar los jugadores según la categoría
      console.log(`Jugadores ${category}:`, players);
    } catch (error) {
      this.error = `Error al obtener jugadores de categoría ${category}`;
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
