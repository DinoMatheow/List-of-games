import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBarComponent } from '../../components/searchBar/searchBar.component';
@Component({
  selector: 'app-podium',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './podium.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodiumComponent { }
