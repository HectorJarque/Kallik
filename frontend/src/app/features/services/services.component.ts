import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class Services {}
