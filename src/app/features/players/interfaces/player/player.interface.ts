// interfaces/podium-player.interface.ts
import { IDNamePlayers } from '../player-info/idName-players.interface';
import { InfoPlayers } from '../player-info/info-players.interface';
import { ImgLevel } from '../player-info/img-level-player.interface';

export interface PodiumPlayer {
  idName: IDNamePlayers;
  info: InfoPlayers[];
  imgLevel: ImgLevel;
  matchIds: string[];
}
