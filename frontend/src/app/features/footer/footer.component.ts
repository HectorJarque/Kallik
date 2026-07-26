import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { UiStateService } from '../../core/services/ui-state.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class Footer {
  ui = inject(UiStateService);
  year = new Date().getFullYear();
}
