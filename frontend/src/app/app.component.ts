import { Component, inject } from '@angular/core';
import { ThemeManagerService } from './core/services/theme-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false
})
export class AppComponent {
  title = 'PostDocs';
  
}
