import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { UiStateService } from '../../core/services/ui-state.service';

@Component({
  selector: 'app-privacy-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyModal {
  ui = inject(UiStateService);
}
