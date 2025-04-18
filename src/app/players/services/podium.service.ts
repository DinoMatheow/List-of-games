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
}
