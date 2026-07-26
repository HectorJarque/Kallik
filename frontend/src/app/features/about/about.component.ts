import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class About {
}
