import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeManagerService {
  // light as the default theme.
  themeSignal = signal<string>("light");

  constructor() {
    // Load the saved theme from localStorage.
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.themeSignal.set(savedTheme) ;
    } else {
      localStorage.setItem('theme', this.themeSignal())
    }
    this.applyTheme();
  }

  // Toggles between light and dark themes.
  toggleTheme(): void {
    this.themeSignal.update( value => value == 'light'? 'dark' : 'light');
    localStorage.setItem('theme', this.themeSignal());
    this.applyTheme();
  }

  // Applies the theme by setting the attribute 'data-bs-theme for the html tag.
  applyTheme(){
    document.documentElement.setAttribute('data-bs-theme', this.themeSignal());
    // const prismStyleLink = document.getElementById('prism-theme') as HTMLLinkElement;
    // console.log(prismStyleLink)
    // if (this.themeSignal() === 'light') {
    //   prismStyleLink.href = '../node_modules/prismjs/themes/prism-okaidia.css';
    // } else {
    //   prismStyleLink.href = '../node_modules/prismjs/themes/prism-coy.css';
    // }
  }

  // Applies the current theme by toggling classes.
  // private applyTheme(): void {
  //   document.body.classList.toggle('dark-theme', this.theme == 'dark');
  //   document.body.classList.toggle('light-theme', this.theme == 'light');
  // }

  // Returns the current theme mode.
  get currentTheme(): string {
    return this.themeSignal();
  }
}
