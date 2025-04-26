import { ChangeDetectionStrategy, Component, inject, signal, input } from '@angular/core';
import { SearchInputComponent } from '../../components/players-search-input/players-search-input.component';
import { PlayersListComponent } from '../search-list/players-list.component';
import { PlayerListComponent } from '../player-list/player-list.component';

// services
import { PlayersService } from '../../services/players.service';
import { PodiumService } from '../../services/podium.service';
// interfaces
import { IDNamePlayers } from '../../interfaces/player-info/idName-players.interface';
import { InfoPlayers } from '../../interfaces/player-info/info-players.interface';
import { ImgLevel } from '../../interfaces/player-info/img-level-player.interface';
import { MatchIdList } from '../../interfaces/matchs-info/match-id-.interdace';
import { MatchInfo } from '../../interfaces/matchs-info/match-info.interface';
import { PodiumPlayer } from '../../interfaces/player/player.interface';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [SearchInputComponent, PlayersListComponent, LoadingComponent],
  templateUrl: './searchBar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  playersService = inject(PlayersService);
  podiumService = inject(PodiumService);

    isLoading = signal(false);
    isError = signal<string | null>(null);

    players = signal<IDNamePlayers[]>([]);
    infoPlayer = signal<InfoPlayers[]>([]);
    imgLevelPlayer = signal<ImgLevel | null>(null);
    matchIds = signal<string[]>([]);





    onSearch(query: string) {
      console.log('search player', query);

      if (this.isLoading()) { return; }

      this.isLoading.set(true);
      this.isError.set(null);

      this.playersService.searchPlayers(query)
          .subscribe((players) => {
              this.isLoading.set(false);

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
              this.playersService.getMatchId(playersArray[0].puuid)
                  .subscribe((matchIds) => {
                      console.log('matchIds', matchIds);
                      this.matchIds.set(matchIds);
                  });





          });
  }

  onSaveToPodium() {
    const newPlayer: PodiumPlayer = {
      idName: this.players()[0],
      info: this.infoPlayer(),
      imgLevel: this.imgLevelPlayer()!,
      matchIds: this.matchIds(),
    };

    this.podiumService.addPlayer(newPlayer);
  }


}
