import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-includes',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './includes.component.html',
  styleUrl: './includes.component.css'
})
export class Includes {
  readonly includesFeatures = [
    {
      key: 'includes.feature.responsive',
      static: true,
      dynamic: true,
      hybrid: true
    },
    {
      key: 'includes.feature.https',
      static: true,
      dynamic: true,
      hybrid: true
    },
    { key: 'includes.feature.seo', static: true, dynamic: true, hybrid: true },
    {
      key: 'includes.feature.speed',
      static: true,
      dynamic: true,
      hybrid: true
    },
    {
      key: 'includes.feature.contact',
      static: false,
      dynamic: true,
      hybrid: true
    },
    { key: 'includes.feature.api', static: false, dynamic: true, hybrid: true },
    {
      key: 'includes.feature.database',
      static: false,
      dynamic: true,
      hybrid: true
    },
    {
      key: 'includes.feature.admin',
      static: false,
      dynamic: false,
      hybrid: true
    },
    {
      key: 'includes.feature.cms',
      static: false,
      dynamic: false,
      hybrid: true
    },
  ];
}
