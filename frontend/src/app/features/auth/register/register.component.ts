import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CredentialsValidator } from '../../../shared/validators/credentials.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  constructor
  (
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
        CredentialsValidator.invalidSpecialChar,
        CredentialsValidator.noWhiteSpace,
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        // CredentialsValidator.emailExists
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        CredentialsValidator.invalidSpecialChar,
        CredentialsValidator.noWhiteSpace,
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        CredentialsValidator.invalidSpecialChar,
        CredentialsValidator.noWhiteSpace,
      ]],
    },
    {
      validators: CredentialsValidator.passwordMatch
    }
  );
  }

  register() {
    const credentials = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
  
    this.authService.register(credentials).subscribe({
      next: () => {
        console.log('Registration successful!');
        this.router.navigate(['/auth/login']); // Navigate to login page
      },
      error: (err) => {
        console.error('Registration failed:', err);
        if (err.error?.error === 'Username taken') {
          this.registerForm.get('username')?.setErrors({ usernameTaken: true });
        } else {
          alert('Registration failed. Please try again.');
        }
      }
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
