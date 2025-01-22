import { Component, input } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FieldsetModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  collapsed = input.required<boolean>();
  sectionTitle = input.required<string>();
}
