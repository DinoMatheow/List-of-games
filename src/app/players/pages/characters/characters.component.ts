import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [],
  templateUrl: './characters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent { }
