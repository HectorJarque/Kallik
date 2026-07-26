import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiStateService {
  dark = signal(true);
  menu = signal(false);
  privacyOpen = signal(false);
  faqOpenIndex = signal<number | null>(null);

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.dark());
    });
  }

  toggleTheme(): void {
    this.dark.set(!this.dark());
  }

  toggleMenu(): void {
    this.menu.set(!this.menu());
  }

  closeMenu(): void {
    this.menu.set(false);
  }

  toggleFaq(i: number): void {
    this.faqOpenIndex.update(current => current === i ? null : i);
  }

  openPrivacy(): void {
    this.privacyOpen.set(true);
  }

  closePrivacy(): void {
    this.privacyOpen.set(false);
  }
}
