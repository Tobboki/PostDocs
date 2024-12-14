import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from "@angular/forms";

export class CredentialsValidator {
  
  // Synchronous Validator for No Whitespace
  static noWhiteSpace: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (value && value.includes(" ")) {
      return { whitespace: true };
    }

    return null;
  };
  
  // Asynchronous Validator for Special Characters
  static invalidSpecialChar: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    // Matches any character that is not a word character (alphanumeric or '_')
    const specialCharRegex = /[^\w]/g; 

        if (value) {
            const matches = value.match(specialCharRegex);
            if (matches && matches.length > 0) {
                return {
                    invalidSpecialChar: true
                };
            }
        }

        return null;
  };
}