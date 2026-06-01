import { Component, effect, inject, signal } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { TranslationService } from './core/services/translation.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [BadgeModule, TagModule, DividerModule, TranslatePipe, NgOptimizedImage]
})
export class App {
  private i18n = inject(TranslationService);

  lang = this.i18n.lang;
  dark = signal(true);
  menu = signal(false);
  year = new Date().getFullYear();

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.dark());
    });
  }

  toggleLang()  { this.i18n.setLang(this.lang() === 'es' ? 'en' : 'es'); }
  toggleTheme() { this.dark.set(!this.dark()); }
  toggleMenu()  { this.menu.set(!this.menu()); }
  closeMenu()   { this.menu.set(false); }
}
