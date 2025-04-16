import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBarComponent } from '../../components/searchBar/searchBar.component';
import { CreatePodiumComponent } from '../../../podium-form/create-podium/create-podium.component';
@Component({
  selector: 'app-podium',
  standalone: true,
  imports: [SearchBarComponent, CreatePodiumComponent],
  templateUrl: './podium.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodiumComponent { }
