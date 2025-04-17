import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html'
})
export class LoadingComponent {
  // Usando input signals con valores por defecto
  size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  showText = input(true);

  // Computed signal para la clase de tamaño
  sizeClass = computed(() => `loading-${this.size()}`);
}