import { Component, effect, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [ButtonModule, TagModule, CardModule, DividerModule, BadgeModule]
})
export class App {
  dark = signal(true);
  menu = signal(false);
  year = new Date().getFullYear();

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.dark());
    });
  }

  toggleTheme() { this.dark.set(!this.dark()); }
  toggleMenu()  { this.menu.set(!this.menu()); }
  closeMenu()   { this.menu.set(false); }
}
