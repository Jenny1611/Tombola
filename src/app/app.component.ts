import { Component } from '@angular/core';
import { TombolaCardComponent } from './tombola-card/tombola-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TombolaCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor() {}
}
