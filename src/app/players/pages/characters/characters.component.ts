import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBarComponent } from '../../components/searchBar/searchBar.component';
@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './characters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent { }
