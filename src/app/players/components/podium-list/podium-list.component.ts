import { ChangeDetectionStrategy, Component, inject, signal, input, effect } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { MatchIdList } from '../../interfaces/matchs-info/match-id-.interdace';
import { MatchInfo } from '../../interfaces/matchs-info/match-info.interface';
import { CommonModule } from '@angular/common';
import { PodiumService } from '../../services/podium.service';
import { PlayersListComponent } from '../players-list/players-list.component';
import { PodiumPlayer } from '../../interfaces/player/player.interface';

@Component({
  selector: 'podium-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podium-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodiumListComponent {
  private playersService = inject(PlayersService);
  private podiumService = inject(PodiumService);
  podiumPlayers = this.podiumService.podiumPlayers;
  matchIds = input<string[]>([]);
  matchInfo = signal<MatchInfo | null>(null);

  getTierBadgeClass(player: PodiumPlayer): string {
    const tier = player.info[0]?.tier?.toLowerCase();
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

  constructor() {
    console.log('PodiumListComponent - Constructor iniciado');
    effect(() => {
      console.log('Effect - matchIds cambiado');
      const ids = this.matchIds();
      console.log('IDs recibidos:', ids);

      if (ids && ids.length > 0) {
        const selectedMatchId = ids[0];
        this.playersService.getInfoMatch(selectedMatchId)
          .subscribe((infoMatch) => {
            console.log('infoMatch', infoMatch);
            this.matchInfo.set(infoMatch);
          });
      }
    });
  }
}
