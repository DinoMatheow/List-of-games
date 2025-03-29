import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchInputComponent } from '../../components/players-search-input/players-search-input.component';
import { PlayersListComponent } from '../../components/players-list/players-list.component';
@Component({
  selector: 'app-by-kills',
  standalone: true,
  imports: [SearchInputComponent, PlayersListComponent],
  templateUrl: './by-kills.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByKillsComponent { }
