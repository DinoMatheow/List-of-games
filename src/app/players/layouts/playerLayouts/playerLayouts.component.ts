import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from '../../components/top-menu/top-menu.component';
@Component({
  selector: 'app-player-layouts',
  standalone: true,
  imports: [RouterOutlet, TopMenuComponent],
  templateUrl: './playerLayouts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerLayoutsComponent { }
