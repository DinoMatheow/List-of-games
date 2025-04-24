import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-id-page',
  standalone: true,
  imports: [],
  templateUrl: './id-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdPageComponent { }
