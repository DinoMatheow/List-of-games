import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { IDNamePlayers } from '../../interfaces/player-info/idName-players.interface';
import { InfoPlayers } from '../../interfaces/player-info/info-players.interface';
import { ImgLevel } from '../../interfaces/player-info/img-level-player.interface';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { MatchIdList } from '../../interfaces/matchs-info/match-id-.interdace';
import { MatchInfo } from '../../interfaces/matchs-info/match-info.interface';

@Component({
  selector: 'players-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersListComponent {
  infoPlayer = input<InfoPlayers[]>([]);
  players = input<IDNamePlayers[]>([]);
  imgLevelPlayer = input<ImgLevel>();



  get playerInfo(): InfoPlayers {
    return this.infoPlayer()[0] || this.infoPlayer()[1] || {};
  }

  getTierBadgeClass(): string {
    const tier = this.playerInfo.tier?.toLowerCase();
    switch (tier) {
      case 'iron': return 'badge badge-secondary';
      case 'bronze': return 'badge badge-warning';
      case 'silver': return 'badge badge-neutral';
      case 'gold': return 'badge badge-accent';
      case 'platinum': return 'badge badge-success';
      case 'emerald': return 'badge badge-info';
      case 'diamond': return 'badge badge-primary';
      case 'master': return 'badge badge-error';
      case 'grandmaster':
      case 'challenger':
        return 'badge badge-error text-white';
      default: return 'badge badge-neutral';
    }
  }
}
