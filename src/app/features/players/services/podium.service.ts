import { Injectable, signal } from '@angular/core';
import { PodiumPlayer } from '../interfaces/player/player.interface';

@Injectable({ providedIn: 'root' })
export class PodiumService {
  private _podiumPlayers = signal<PodiumPlayer[]>([]);
  readonly podiumPlayers = this._podiumPlayers.asReadonly();

  addPlayer(player: PodiumPlayer) {
    this._podiumPlayers.update(players => [...players, player]);
  }

  removePlayer(puuid: string) {
    this._podiumPlayers.update(players =>
      players.filter(p => p.idName.puuid !== puuid)
    );
  }

  clear() {
    this._podiumPlayers.set([]);
  }

  // Nuevos métodos para acceder a los datos
  getPlayerByPuuid(puuid: string): PodiumPlayer | undefined {
    return this._podiumPlayers().find(player => player.idName.puuid === puuid);
  }

  getPlayersByTier(tier: string): PodiumPlayer[] {
    return this._podiumPlayers().filter(player =>
      player.info[0]?.tier?.toLowerCase() === tier.toLowerCase()
    );
  }

  getPlayersByRank(rank: string): PodiumPlayer[] {
    return this._podiumPlayers().filter(player =>
      player.info[0]?.rank?.toLowerCase() === rank.toLowerCase()
    );
  }

  getPlayersSortedByLP(): PodiumPlayer[] {
    return [...this._podiumPlayers()].sort((a, b) =>
      (b.info[0]?.leaguePoints || 0) - (a.info[0]?.leaguePoints || 0)
    );
  }
}
