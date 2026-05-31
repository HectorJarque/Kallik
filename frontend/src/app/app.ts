import { Component, computed, signal } from '@angular/core';
import { ApiService } from './services/api.service';

const TRANSLATIONS = {
  es: {
    nav1: 'Qué hago', nav2: 'Sobre mí', nav3: 'Proyectos', nav4: 'Contacto',
    introH1: 'Hago webs rápidas, claras y fáciles de usar',
    introP1: 'Sin cosas innecesarias, sin webs lentas y sin complicarte la vida.',
    introP2: 'Dependiendo de lo que necesites, puedo hacer desde una web sencilla hasta una más interactiva con formularios, buscadores o funciones más avanzadas.',
    introP3: '<strong>No gestiono dominios ni hosting de serie</strong>, pero si no quieres líos puedo encargarme yo y sumarlo al presupuesto. Lo hablamos y ya está.',
    avisoTitulo: 'Esta web está en desarrollo',
    avisoTexto: 'Estoy migrando mi portfolio a Angular + Spring Boot para mostrar más funcionalidades.',
    serviciosTitulo: 'Tipos de web que hago',
    serv1Titulo: 'Web estática',
    serv1Desc: 'Página web sencilla y rápida, hecha a medida y sin complicaciones. Sin sistemas difíciles de usar, sin mantenimiento constante.',
    serv1Carga: 'Carga instantánea.',
    serv1Aloja: 'Se aloja en cualquier sitio. No hay nada que romper.',
    serv2Titulo: 'Web dinámica',
    serv2Desc: 'Aquí ya hablamos de una web más interactiva: filtros, buscadores, contenido que cambia al instante, formularios inteligentes y conexiones con APIs.',
    serv2Hace: 'Para cuando necesitas que la web <em>haga</em> algo más que mostrar información.',
    serv3Titulo: 'Web híbrida',
    serv3Desc: 'Una parte visible para clientes y otra privada para gestionar contenido. Formularios que guardan datos, paneles para editar sin tocar código.',
    serv3Crecimiento: 'Todo pensado para que la web vaya rápida, sea segura y pueda crecer en el futuro.',
    precioTitulo: 'Sobre precios:',
    precioTexto: 'Cada proyecto es distinto, así que los precios se hablan sin compromiso. Dependiendo de lo que necesites, ajustamos el presupuesto.',
    sobreMiTitulo: 'Quién está detrás de esto',
    sobreMiP1: 'Me llamo <strong>Héctor Jarque</strong>. No vengo de agencia ni de bootcamp milagroso. Aprendí haciendo cosas, rompiéndolas y arreglándolas.',
    sobreMiP2: 'Empecé sin entender nada y poco a poco me fui formando hasta poder crear las webs y proyectos que hago hoy en día.',
    sobreMiP3: 'No te voy a soltar jerga para impresionar. Si algo no se puede hacer, te lo digo. Si se puede, pero es mala idea, también.',
    sobreMiP4: 'Vivo en <strong>Valencia</strong>. Trabajo en remoto sin problema, y si estás cerca podemos tomar un café.',
    proyectosTitulo: 'Algunas cosas que he hecho',
    proy1Titulo: 'Web de portfolio personal',
    proy1Desc: 'La web que estás viendo. Dark/light mode, multilenguaje y construida con Angular + Spring Boot.',
    proy2Titulo: 'Rastreador de logros de Steam',
    proy2Desc: 'Conecta tu cuenta de Steam y analiza tus logros: progreso, cómo conseguirlos, cuántos te faltan.',
    tagEstatica: 'Web estática', tagDinamica: 'Web dinámica',
    expTag: 'Experiencia laboral',
    expTitulo: '3 meses en equipo de desarrollo fintech',
    expDesc: 'Estuve colaborando con un equipo muy competente en el desarrollo y mantenimiento de su plataforma. Toqué frontend y backend, mejoré funcionalidades y aprendí cómo se trabaja en un entorno tecnológico real.',
    contactoTitulo: 'Hablamos',
    contactoP1: 'Lo mejor es que me escribas un correo contándome qué tienes en mente.',
    contactoP2: 'Si ya tienes una web, pásamela y le echo un vistazo. Si no tienes nada, cuéntame más o menos qué te gustaría.',
    contactoP3: 'No hace falta saber de tecnología ni tenerlo todo claro. Le damos forma juntos.',
    contactoGitHub: 'Más proyectos en GitHub',
    contactoLinkedIn: 'LinkedIn',
    testBoton: 'Probar conexión con el backend',
    testCargando: 'Conectando...',
  },
  en: {
    nav1: 'What I do', nav2: 'About me', nav3: 'Projects', nav4: 'Contact',
    introH1: 'I build fast, clear and easy-to-use websites',
    introP1: 'No unnecessary stuff, no slow websites, no headaches.',
    introP2: 'Depending on your needs, I can do a simple site or something more interactive with forms, search features or advanced functions.',
    introP3: '<strong>I don\'t usually manage domains or hosting</strong>, but if you don\'t want any hassle I can take care of it. We\'ll talk.',
    avisoTitulo: 'This website is under development',
    avisoTexto: 'I\'m migrating my portfolio to Angular + Spring Boot to showcase more features.',
    serviciosTitulo: 'Types of websites I build',
    serv1Titulo: 'Static website',
    serv1Desc: 'A simple and fast custom-made page. No difficult systems, no constant maintenance.',
    serv1Carga: 'Instant loading.',
    serv1Aloja: 'Host it anywhere. Nothing to break.',
    serv2Titulo: 'Dynamic website',
    serv2Desc: 'A more interactive website: filters, search, content that updates instantly, smart forms and API connections.',
    serv2Hace: 'For when you need the website to <em>do</em> something more than just display information.',
    serv3Titulo: 'Hybrid website',
    serv3Desc: 'A public-facing part and a private one to manage content. Forms that save data, simple panels to edit without touching code.',
    serv3Crecimiento: 'Everything designed to be fast, secure and ready to grow.',
    precioTitulo: 'About pricing:',
    precioTexto: 'Every project is different, so prices are discussed without obligation. We adjust the budget to what you need.',
    sobreMiTitulo: 'Who\'s behind this',
    sobreMiP1: 'My name is <strong>Héctor Jarque</strong>. I don\'t come from an agency or a miracle bootcamp. I learned by doing, breaking and fixing things.',
    sobreMiP2: 'I started knowing nothing and gradually trained myself until I could build the websites and projects I create today.',
    sobreMiP3: 'I won\'t throw jargon at you to impress. If something can\'t be done, I\'ll tell you. If it can but it\'s a bad idea, I\'ll tell you too.',
    sobreMiP4: 'I live in <strong>Valencia, Spain</strong>. I work remotely, and if you\'re nearby we can grab a coffee.',
    proyectosTitulo: 'Some things I\'ve built',
    proy1Titulo: 'Personal portfolio website',
    proy1Desc: 'The website you\'re looking at. Dark/light mode, multi-language, built with Angular + Spring Boot.',
    proy2Titulo: 'Steam Achievement Tracker',
    proy2Desc: 'Connect your Steam account and analyze your achievements: progress, how to unlock them, missing ones.',
    tagEstatica: 'Static website', tagDinamica: 'Dynamic website',
    expTag: 'Work Experience',
    expTitulo: '3 months in a fintech development team',
    expDesc: 'I collaborated with a highly skilled team on the development and maintenance of their platform. I worked on both frontend and backend and learned how things are done in a real tech environment.',
    contactoTitulo: 'Let\'s talk',
    contactoP1: 'The best thing is to send me an email telling me what you have in mind.',
    contactoP2: 'If you already have a website, send me the link. If you don\'t have anything yet, tell me what you\'d like.',
    contactoP3: 'You don\'t need to know about tech or have everything figured out. We\'ll shape it together.',
    contactoGitHub: 'More projects on GitHub',
    contactoLinkedIn: 'LinkedIn',
    testBoton: 'Test backend connection',
    testCargando: 'Connecting...',
  }
} as const;

type Lang = keyof typeof TRANSLATIONS;

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: []
})
export class App {
  lang   = signal<Lang>('es');
  dark   = signal(true);
  menu   = signal(false);

  backendRespuesta = signal<string | null>(null);
  backendCargando  = signal(false);
  backendError     = signal<string | null>(null);

  t    = computed(() => TRANSLATIONS[this.lang()]);
  year = new Date().getFullYear();

  constructor(private api: ApiService) {}

  toggleLang()  { this.lang.set(this.lang() === 'es' ? 'en' : 'es'); }
  toggleTheme() { this.dark.set(!this.dark()); }
  toggleMenu()  { this.menu.set(!this.menu()); }
  closeMenu()   { this.menu.set(false); }

  testBackend() {
    this.backendCargando.set(true);
    this.backendRespuesta.set(null);
    this.backendError.set(null);

    this.api.hello().subscribe({
      next:  (res) => { this.backendRespuesta.set(res.mensaje); this.backendCargando.set(false); },
      error: ()    => { this.backendError.set('No se pudo conectar con el backend'); this.backendCargando.set(false); }
    });
  }
}
