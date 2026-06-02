import { Component, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { TranslationService } from './core/services/translation.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [BadgeModule, TagModule, DividerModule, TranslatePipe, NgOptimizedImage, FormsModule]
})
export class App {
  private i18n = inject(TranslationService);
  private http = inject(HttpClient);

  lang = this.i18n.lang;
  dark = signal(true);
  menu = signal(false);
  year = new Date().getFullYear();

  // ── Contacto ───────────────────────────────────────────────────
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: ''
  };

  formErrors: Record<string, string> = {};
  contactSending = false;
  contactSent = false;
  contactError = false;

  // ──────────────────────────────────────────────────────────────

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.dark());
    });
  }

  toggleLang() {
    this.i18n.setLang(this.lang() === 'es' ? 'en' : 'es');
  }

  toggleTheme() {
    this.dark.set(!this.dark());
  }

  toggleMenu() {
    this.menu.set(!this.menu());
  }

  closeMenu() {
    this.menu.set(false);
  }

  sendContactMessage(): void {
    this.formErrors = {};
    this.contactError = false;

    if (!this.contactForm.name || this.contactForm.name.trim().length < 2)
      this.formErrors['name'] = 'Mínimo 2 caracteres';

    if (!this.contactForm.email || !this.contactForm.email.includes('@'))
      this.formErrors['email'] = 'Email no válido';

    if (!this.contactForm.subject || this.contactForm.subject.trim().length < 3)
      this.formErrors['subject'] = 'Mínimo 3 caracteres';

    if (!this.contactForm.message || this.contactForm.message.trim().length < 10)
      this.formErrors['message'] = 'Mínimo 10 caracteres';

    if (Object.keys(this.formErrors).length > 0) return;

    this.contactSending = true;

    this.http.post(`${environment.apiUrl}/api/contact`, this.contactForm).subscribe({
      next: () => {
        this.contactSending = false;
        this.contactSent = true;
        this.contactForm = {
          name: '',
          email: '',
          subject: '',
          message: '',
          honeypot: ''
        };
      },
      error: () => {
        this.contactSending = false;
        this.contactError = true;
      }
    });
  }
}
