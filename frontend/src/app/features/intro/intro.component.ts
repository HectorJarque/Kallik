import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class Intro {}
