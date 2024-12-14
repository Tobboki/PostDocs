import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CredentialsValidator } from '../../../shared/validators/credentials.validator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  constructor
  (
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
        CredentialsValidator.invalidSpecialChar,
        CredentialsValidator.noWhiteSpace,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        CredentialsValidator.invalidSpecialChar,
        CredentialsValidator.noWhiteSpace,
      ]],
    });
  }

  login() {
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      // Success Response
      next: (response) => {
        console.log(response);
      },
      complete: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        console.log(returnUrl)
        this.router.navigateByUrl(returnUrl);
      },
      // Handle Errors
      error: (err: any) => {
        if (err.error?.error === 'Invalid username') {
          this.loginForm.get('username')?.setErrors({ invalidUsername: true });
        } else if (err.error?.error === 'Invalid password') {
          this.loginForm.get('password')?.setErrors({ invalidCredentials: true });
        } else {
          console.error('Unexpected error:', err);
        }
      },
    });
    
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
