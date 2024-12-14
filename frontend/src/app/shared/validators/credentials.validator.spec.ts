import { CredentialsValidator } from './credentials.validator';
import { of } from 'rxjs';

describe('CredentialsValidator', () => {
  describe('noWhiteSpace', () => {
    it('should return an error if whitespace exists', (done) => {
      const control = { value: 'hello world' } as any;
      CredentialsValidator.noWhiteSpace(control).subscribe((result) => {
        expect(result).toEqual({ whitespace: true });
        done();
      });
    });

    it('should return null if no whitespace exists', (done) => {
      const control = { value: 'helloworld' } as any;
      CredentialsValidator.noWhiteSpace(control).subscribe((result) => {
        expect(result).toBeNull();
        done();
      });
    });
  });

  describe('findSpecialChar', () => {
    const validator = CredentialsValidator.findSpecialChar();

    it('should return an error with the special character if one exists', (done) => {
      const control = { value: 'hello@world' } as any; // Contains '@'
      validator(control).subscribe((result) => {
        expect(result).toEqual({ invalidChar: '@' });
        done();
      });
    });

    it('should return an error with all special characters if multiple exist', (done) => {
      const control = { value: 'hello@world!' } as any; // Contains '@' and '!'
      validator(control).subscribe((result) => {
        expect(result).toEqual({ invalidChar: '@!' });
        done();
      });
    });

    it('should return null if no special characters exist', (done) => {
      const control = { value: 'hello_world' } as any; // Underscore is allowed
      validator(control).subscribe((result) => {
        expect(result).toBeNull();
        done();
      });
    });

    it('should return null for alphanumeric values', (done) => {
      const control = { value: 'Hello123' } as any; // Only letters and numbers
      validator(control).subscribe((result) => {
        expect(result).toBeNull();
        done();
      });
    });
  });
});
