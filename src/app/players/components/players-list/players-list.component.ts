import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IDNamePlayers } from '../../interfaces/idName-players.interface';
import { InfoPlayers } from '../../interfaces/info-players.interface';
import { ImgLevel } from '../../interfaces/img-level-player.interface';
@Component({
  selector: 'players-list',
  standalone: true,
  imports: [],
  templateUrl: './players-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersListComponent {

 infoPlayer = input<InfoPlayers[]>([]);
  players = input<IDNamePlayers[]>([]);
  imgLevelPlayer = input<ImgLevel>();
}
