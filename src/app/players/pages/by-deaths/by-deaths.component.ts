import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/players-search-input/players-search-input.component';
import { PlayersListComponent } from '../../components/players-list/players-list.component';
import { PlayersService } from '../../services/players.service';
import { IDNamePlayers } from '../../interfaces/idName-players.interface';
import { InfoPlayers } from '../../interfaces/info-players.interface';
@Component({
  selector: 'app-by-deaths',
  standalone: true,
  imports: [SearchInputComponent, PlayersListComponent],
  templateUrl: './by-deaths.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByDeathsComponent {

  playersService = inject(PlayersService);

    isLoading = signal(false);
    isError = signal<string | null>(null);
    players = signal<IDNamePlayers[]>([]);
    infoPlayer = signal<InfoPlayers | null>(null);


    onSearch(query: string) {
      console.log('search player', query);

      if (this.isLoading()) { return; }

      this.isLoading.set(true);
      this.isError.set(null);

      this.playersService.searchPlayers(query)
          .subscribe((players) => {
              this.isLoading.set(false);

              // 🔥 Verificamos que players no sea null/undefined
              if (!players) {
                  console.error("La API devolvió un valor vacío o nulo.", players);
                  this.isError.set("No se encontraron jugadores.");
                  return;
              }

              // 🔥 Si players es un array vacío, no hay jugadores
              if (Array.isArray(players) && players.length === 0) {
                  console.error("No se encontraron jugadores en el array.", players);
                  this.isError.set("No se encontraron jugadores.");
                  return;
              }

              // 🔥 Si la API devuelve un objeto en lugar de un array, convertirlo
              const playersArray = Array.isArray(players) ? players : [players];

              // 🔥 Verificamos que el primer jugador tenga `puuid`
              if (!playersArray[0]?.puuid) {
                  console.error("El jugador no tiene 'puuid'.", playersArray);
                  this.isError.set("Error al obtener el ID del jugador.");
                  return;
              }

              this.players.set(playersArray); // Guardamos los jugadores en el estado

              console.log('players', playersArray);

              // Llamar a getInfoPlayer con el `puuid` correcto
              this.playersService.getInfoPlayer(playersArray[0].puuid)
                  .subscribe((info) => {
                      console.log('info', info);
                      this.infoPlayer.set(info);
                  });
          });
  }


}
