import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrl: './code-snippet.component.css'
})
export class CodeSnippetComponent {
  @Input() title: string = '';
  @Input() code: string = '';
  @Input() output: string = '';
}
