import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'search-input',
  standalone: true,
  imports: [],
  templateUrl: './players-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {

  placeholder = input<string>('Search');

  value = output<string>();
 }
