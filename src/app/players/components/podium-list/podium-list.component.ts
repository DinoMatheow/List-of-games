import { ChangeDetectionStrategy, Component, inject, signal, input, effect } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { MatchIdList } from '../../interfaces/matchs-info/match-id-.interdace';
import { MatchInfo } from '../../interfaces/matchs-info/match-info.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-podium-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podium-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodiumListComponent {
  private playersService = inject(PlayersService);

  matchIds = input<string[]>([]);
  matchInfo = signal<MatchInfo | null>(null);

  constructor() {
    console.log('PodiumListComponent - Constructor iniciado');
    effect(() => {
      console.log('Effect - matchIds cambiado');
      const ids = this.matchIds();
      console.log('IDs recibidos:', ids);

      if (ids && ids.length > 0) {
        const selectedMatchId = ids[0];
        console.log('ID seleccionado:', selectedMatchId);

        this.playersService.getInfoMatch(selectedMatchId)
          .subscribe({
            next: (infoMatch) => {
              console.log('Info de partida recibida:', infoMatch);
              this.matchInfo.set(infoMatch);
            },
            error: (error) => {
              console.error('Error al obtener info de partida:', error);
            }
          });
      } else {
        console.log('No hay IDs de partidas disponibles');
      }
    });
  }
}
