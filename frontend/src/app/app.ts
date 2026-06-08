import { Component, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { environment } from '../environments/environment';
import { TranslationService, Lang } from './core/services/translation.service';

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

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.dark());
    });
  }

  changeLang(lang: Lang) {
    this.i18n.setLang(lang);
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

  private readonly emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  private readonly nameRegex  = /^[\p{L}\s'\-]+$/u;

  sendContactMessage(): void {
    this.formErrors = {};
    this.contactError = false;

    if (!this.contactForm.name || this.contactForm.name.trim().length < 2)
      this.formErrors['name'] = '2 characters minimum';
    else if (!this.nameRegex.test(this.contactForm.name.trim()))
      this.formErrors['name'] = 'Only letters, spaces and hyphens ';

    if (!this.contactForm.email)
      this.formErrors['email'] = 'Email required';
    else if (!this.emailRegex.test(this.contactForm.email.trim()))
      this.formErrors['email'] = 'A valid email is required)';

    if (!this.contactForm.subject || this.contactForm.subject.trim().length < 3)
      this.formErrors['subject'] = '3 characters minimum';

    if (!this.contactForm.message || this.contactForm.message.trim().length < 10)
      this.formErrors['message'] = '10 characters minimum';

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
      error: (err) => {
        this.contactSending = false;
        if (err.status === 400 && err.error?.errors) {
          this.formErrors = err.error.errors;
        } else {
          this.contactError = true;
        }
      }
    });
  }
  readonly languages: Lang[] = [
    'es',
    'en',
    'fr',
    'it',
    'de',
    'pt',
    'zh'
  ];

  cycleLanguage() {
    const current = this.languages.indexOf(this.lang());
    const next = (current + 1) % this.languages.length;

    this.i18n.setLang(this.languages[next]);
  }
}

