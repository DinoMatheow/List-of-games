import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/players-search-input/players-search-input.component';
import { PlayersListComponent } from '../../components/players-list/players-list.component';

// services
import { PlayersService } from '../../services/players.service';

// interfaces
import { IDNamePlayers } from '../../interfaces/idName-players.interface';
import { InfoPlayers } from '../../interfaces/info-players.interface';
import { ImgLevel } from '../../interfaces/img-level-player.interface';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [SearchInputComponent, PlayersListComponent],
  templateUrl: './searchBar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  playersService = inject(PlayersService);

    isLoading = signal(false);
    isError = signal<string | null>(null);
    players = signal<IDNamePlayers[]>([]);
    infoPlayer = signal<InfoPlayers[]>([]);
    imgLevelPlayer = signal<ImgLevel | null>(null);

    onSearch(query: string) {
      console.log('search player', query);

      if (this.isLoading()) { return; }

      this.isLoading.set(true);
      this.isError.set(null);

      this.playersService.searchPlayers(query)
          .subscribe((players) => {
              this.isLoading.set(false);

              // verify that players is not null
              // if (!players) {
              //     console.error("La API devolvió un valor vacío o nulo.", players);
              //     this.isError.set("No se encontraron jugadores.");
              //     return;
              // }

              // if players is an  empty array then there are no players
              // if (Array.isArray(players) && players.length === 0) {
              //     console.error("No se encontraron jugadores en el array.", players);
              //     this.isError.set("No se encontraron jugadores.");
              //     return;
              // }

              // if (!playersArray[0]?.puuid) {
              //     console.error("El jugador no tiene 'puuid'.", playersArray);
              //     this.isError.set("Error al obtener el ID del jugador.");
              //     return;
              // }

              const playersArray = Array.isArray(players) ? players : [players];

              this.players.set(playersArray);

              console.log('players', playersArray);


              this.playersService.getInfoPlayer(playersArray[0].puuid)
                  .subscribe((info) => {
                      console.log('info', info);
                      this.infoPlayer.set(info);
                  });
              this.playersService.getImgLevelPlayer(playersArray[0].puuid)
                  .subscribe((imgLevel) => {
                      console.log('imgLevel', imgLevel);
                      this.imgLevelPlayer.set(imgLevel);
                  });
          });
  }


}
