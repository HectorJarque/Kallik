import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: []
})
export class App {
  dark = signal(true);
  menu = signal(false);
  year = new Date().getFullYear();

  toggleTheme() { this.dark.set(!this.dark()); }
  toggleMenu()  { this.menu.set(!this.menu()); }
  closeMenu()   { this.menu.set(false); }
}
