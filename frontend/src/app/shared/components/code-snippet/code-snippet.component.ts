import { Component, Input, OnInit, inject, ChangeDetectorRef, effect } from '@angular/core';
// import { ThemeManagerService } from '../../../core/services/theme-manager.service';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrl: './code-snippet.component.css',
  standalone: false
})
export class CodeSnippetComponent  {
  @Input() title: string = '';
  @Input() code: string = '';
  @Input() output: string = '';

  // private themeService: ThemeManagerService = inject(ThemeManagerService);
  // prismTheme: string = this.themeService.currentTheme == 'light'
  //   ? '../../../../../node_modules/prismjs/themes/prism-okaidia.css'
  //   : '../../../../../node_modules/prismjs/themes/prism-coy.css';

}
