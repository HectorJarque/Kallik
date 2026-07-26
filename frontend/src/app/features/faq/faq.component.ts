import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { UiStateService } from '../../core/services/ui-state.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class Faq {
  ui = inject(UiStateService);

  readonly faqItems = [
    'faq.q1', 'faq.q2', 'faq.q3', 'faq.q4',
    'faq.q5', 'faq.q6', 'faq.q8'
  ];
}
