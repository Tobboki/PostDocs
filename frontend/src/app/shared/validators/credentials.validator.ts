import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { inject } from "@angular/core";
import { Observable, of, debounceTime, switchMap, map, catchError } from "rxjs";
import { HttpClient } from "@angular/common/http";

export class CredentialsValidator {
  // private static http: HttpClient = inject(HttpClient);

  // Synchronous Validator for No Whitespace
  static noWhiteSpace: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (value && value.includes(" ")) {
      return { whitespace: true };
    }

    return null;
  };

  // Synchronous Validator for Special Characters
  static invalidSpecialChar: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    // Matches any character that is not a word character (alphanumeric or '_')
    const specialCharRegex = /[^\w]/g;

    if (value) {
      const matches = value.match(specialCharRegex);
      if (matches && matches.length > 0) {
        return { invalidSpecialChar: true };
      }
    }

    return null;
  };

  // Validator to check if password and confirmPassword match
  static passwordMatch: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null; // No error
  };

  // Asynchronous Validator to Check if Email Exists
  // static emailExists: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
  //   const http = CredentialsValidator.http;

  //   if (!control.value) {
  //     return of(null);
  //   }

  //   return of(control.value).pipe(
  //     debounceTime(300),
  //     switchMap((email) =>
  //       http.get<any>(``).pipe(
  //         map((response) =>
  //           response?.data?.result === "deliverable" ? null : { emailExists: true }
  //         ),
  //         catchError(() => of(null))
  //       )
  //     )
  //   );
  // };
}
