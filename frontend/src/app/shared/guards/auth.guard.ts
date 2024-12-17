import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

// Login Guard: Prevents access if the user is not Logged In
export const loginGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthService).isLoggedIn;
  const router = inject(Router);

  if (isLoggedIn) {
    return true; // Allow access if the user is logged in
  } else {
    router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};

// PreventLoadGuard: Prevents loading if the user is not authenticated
// export const PreventLoadGuard: CanMatchFn = (route, segments) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   return authService.isAuthenticated().pipe(
//     map((isAuthenticated) => {
//       if (isAuthenticated) {
//         return true;
//       } else {
//         // Redirect to login page
//         router.navigate(['/auth/login']);
//         return false;
//       }
//     })
//   );
// };
