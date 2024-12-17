import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'PostDocs';
  isAuthenticated$!: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.initializeAuthState(); // Initialize login state on app startup
  }

}
