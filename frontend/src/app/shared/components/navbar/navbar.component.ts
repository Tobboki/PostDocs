import { Component, inject, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeManagerService } from '../../../core/services/theme-manager.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,
})
export class NavbarComponent {
  themeService: ThemeManagerService = inject(ThemeManagerService);
  theme: string = this.themeService.currentTheme;

  authService: AuthService = inject(AuthService);

  constructor(private router: Router) {}

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['home']);
    });
  }

  navigateToLogin() {
    // Pass the current URL as the returnUrl query parameter
    const currentUrl = this.router.url;
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: currentUrl } });
  }

  navigateToRegister() {
    // Pass the current URL as the returnUrl query parameter
    const currentUrl = this.router.url;
    this.router.navigate(['/auth/register'], { queryParams: { returnUrl: currentUrl } });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.theme = this.themeService.currentTheme;
    if (this.theme) {
      document.documentElement.setAttribute('data-bs-theme', this.theme);
    }
  }
}