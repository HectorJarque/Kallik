import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './process.component.html',
  styleUrl: './process.component.css'
})
export class Process {}
