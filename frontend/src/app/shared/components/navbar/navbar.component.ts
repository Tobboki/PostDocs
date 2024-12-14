import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeManagerService } from '../../../core/services/theme-manager.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,
})
export class NavbarComponent implements OnInit {
  themeService: ThemeManagerService = inject(ThemeManagerService);
  theme: string = this.themeService.currentTheme;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the `isLoggedIn$` observable
    this.authService.isLoggedIn$.subscribe((authenticated) => {
      this.isLoggedIn = authenticated;
    });
  }

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

  toggleTheme() {
    this.themeService.toggleTheme();
    this.theme = this.themeService.currentTheme;
    if (this.theme) {
      document.documentElement.setAttribute('data-bs-theme', this.theme);
    }
  }
}