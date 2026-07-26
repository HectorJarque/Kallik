import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class Contact {
  private http = inject(HttpClient);

  contactForm = { name: '', email: '', subject: '', message: '', honeypot: '' };
  formErrors: Record<string, string> = {};
  contactSending = false;
  contactSent = false;
  contactError = false;

  private readonly emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  private readonly nameRegex = /^[\p{L}\s'\-]+$/u;

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
