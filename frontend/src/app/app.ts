import { Component } from '@angular/core';
import { Header } from './features/header/header.component';
import { Intro } from './features/intro/intro.component';
import { Services } from './features/services/services.component';
import { Process } from './features/process/process.component';
import { Includes } from './features/includes/includes.component';
import { About } from './features/about/about.component';
import { Projects } from './features/projects/projects.component';
import { Faq } from './features/faq/faq.component';
import { Contact } from './features/contact/contact.component';
import { Footer } from './features/footer/footer.component';
import { PrivacyModal } from './features/privacy/privacy.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    Header,
    Intro,
    Services,
    Process,
    Includes,
    About,
    Projects,
    Faq,
    Contact,
    Footer,
    PrivacyModal]
})
export class App {
}
