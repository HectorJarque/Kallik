import { Component, inject, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import {
  TranslationService,
  Lang
} from '../../core/services/translation.service';
import { UiStateService } from '../../core/services/ui-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, Select, TranslatePipe, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class Header {
  private i18n = inject(TranslationService);
  ui = inject(UiStateService);

  lang = this.i18n.lang;

  readonly languages = [
    { code: 'es', label: 'Español', flag: '/img/es.png' },
    { code: 'en', label: 'English', flag: '/img/gb.png' },
    { code: 'cat', label: 'Catalàn', flag: '/img/cat.png' },
    { code: 'fr', label: 'Français', flag: '/img/fr.png' },
    { code: 'it', label: 'Italiano', flag: '/img/it.png' },
    { code: 'de', label: 'Deutsch', flag: '/img/de.png' },
    { code: 'pt', label: 'Português', flag: '/img/pt.png' },
    { code: 'zh', label: '中文', flag: '/img/cn.png' }
  ];

  selectedLanguage = computed(() =>
    this.languages.find(l => l.code === this.lang()) ?? this.languages[0]
  );

  changeLang(selected: { code: string }): void {
    this.i18n.setLang(selected.code as Lang);
  }
}
