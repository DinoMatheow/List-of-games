import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchInputComponent } from '../../components/players-search-input/players-search-input.component';
import { PlayersListComponent } from '../../components/players-list/players-list.component';
@Component({
  selector: 'app-by-deaths',
  standalone: true,
  imports: [SearchInputComponent, PlayersListComponent],
  templateUrl: './by-deaths.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByDeathsComponent {

  onSearch(value: string) {
    console.log(value);
  }
}
