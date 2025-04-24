import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBarComponent } from '../../components/searchBar/searchBar.component';
import { CreatePodiumComponent } from '../../../podium-form/create-podium/create-podium.component';
import { PlayerListComponent } from '../../components/player-list/player-list.component';
@Component({
  selector: 'app-podium',
  standalone: true,
  imports: [SearchBarComponent, CreatePodiumComponent, PlayerListComponent],
  templateUrl: './podium.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodiumComponent { }
