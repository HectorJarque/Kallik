import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { environment } from '../environments/environment';
import { TranslationService, Lang } from './core/services/translation.service';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [
    BadgeModule,
    TagModule,
    DividerModule,
    TranslatePipe,
    NgOptimizedImage,
    FormsModule,
    SelectModule
  ]
})
export class App {
  private i18n = inject(TranslationService);
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  lang = this.i18n.lang;
  dark = signal(true);
  menu = signal(false);
  privacyOpen = signal(false);
  faqOpenIndex = signal<number | null>(null);
  year = new Date().getFullYear();

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

  readonly faqItems = [
    'faq.q1', 'faq.q2', 'faq.q3', 'faq.q4',
    'faq.q5', 'faq.q6', 'faq.q7', 'faq.q8'
  ];

  readonly includesFeatures = [
    { key: 'includes.feature.responsive',  static: true,  dynamic: true,  hybrid: true  },
    { key: 'includes.feature.https',        static: true,  dynamic: true,  hybrid: true  },
    { key: 'includes.feature.seo',          static: true,  dynamic: true,  hybrid: true  },
    { key: 'includes.feature.speed',        static: true,  dynamic: true,  hybrid: true  },
    { key: 'includes.feature.support',      static: true,  dynamic: true,  hybrid: true  },
    { key: 'includes.feature.contact',      static: false, dynamic: true,  hybrid: true  },
    { key: 'includes.feature.api',          static: false, dynamic: true,  hybrid: true  },
    { key: 'includes.feature.database',     static: false, dynamic: true,  hybrid: true  },
    { key: 'includes.feature.admin',        static: false, dynamic: false, hybrid: true  },
    { key: 'includes.feature.cms',          static: false, dynamic: false, hybrid: true  },
  ];

  readonly portfolioImages = ['/img/imagen1.png', '/img/imagen2.png', '/img/imagen3.png'];
  carouselIndex = signal(0);

  contactForm = { name: '', email: '', subject: '', message: '', honeypot: '' };
  formErrors: Record<string, string> = {};
  contactSending = false;
  contactSent = false;
  contactError = false;

  private readonly emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  private readonly nameRegex = /^[\p{L}\s'\-]+$/u;

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.dark());
    });

    const interval = setInterval(
      () => this.carouselIndex.update(i => (i + 1) % this.portfolioImages.length),
      4000
    );
    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  toggleTheme() {
    this.dark.set(!this.dark());
  }

  toggleFaq(i: number): void {
    this.faqOpenIndex.update(current => current === i ? null : i);
  }

  toggleMenu() {
    this.menu.set(!this.menu());
  }

  closeMenu() {
    this.menu.set(false);
  }

  changeLang(lang: string) {
    this.i18n.setLang(lang as Lang);
  }

  prevCarousel() {
    this.carouselIndex.update(i => (i - 1 + this.portfolioImages.length) % this.portfolioImages.length);
  }

  nextCarousel() {
    this.carouselIndex.update(i => (i + 1) % this.portfolioImages.length);
  }

  setCarousel(i: number) {
    this.carouselIndex.set(i);
  }

  sendContactMessage(): void {
    this.formErrors = {};
    this.contactError = false;

    if (!this.contactForm.name || this.contactForm.name.trim().length < 2)
      this.formErrors['name'] = 'validation.name.minLength';
    else if (!this.nameRegex.test(this.contactForm.name.trim()))
      this.formErrors['name'] = 'validation.name.pattern';

    if (!this.contactForm.email)
      this.formErrors['email'] = 'validation.email.required';
    else if (!this.emailRegex.test(this.contactForm.email.trim()))
      this.formErrors['email'] = 'validation.email.format';

    if (!this.contactForm.subject || this.contactForm.subject.trim().length < 3)
      this.formErrors['subject'] = 'validation.subject.minLength';

    if (!this.contactForm.message || this.contactForm.message.trim().length < 10)
      this.formErrors['message'] = 'validation.message.minLength';

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
}
