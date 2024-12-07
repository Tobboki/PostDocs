import { Component, inject } from '@angular/core';
import { ThemeManagerService } from '../../../core/services/theme-manager.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: false
})
export class NavbarComponent {
  themeService: ThemeManagerService = inject(ThemeManagerService);
  theme: string = this.themeService.currentTheme;
  toggleTheme(){
    this.themeService.toggleTheme();
    this.theme = this.themeService.currentTheme;
    if (this.theme){
     document.documentElement.setAttribute('data-bs-theme', this.theme );
    }
  }

}
