import { Injectable } from '@angular/core';
import * as Prism from 'prismjs';

@Injectable({
  providedIn: 'root'
})
export class PrismService {
  constructor() { }
  
  // This method can be used to highlight code on the page after rendering
  highlightAll(): void {
    Prism.highlightAll();
  }

  // This method highlights code in a certain element
  highlight(codeElement: HTMLElement): void {
    Prism.highlightElement(codeElement);
  }

  // This method highlights code under a certain parent
  highlightAllUnder(container: HTMLElement): void {
    Prism.highlightAllUnder(container);
  }
}
