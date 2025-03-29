import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'players-list',
  standalone: true,
  imports: [],
  templateUrl: './players-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersListComponent { }
