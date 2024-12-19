import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PrismService } from '../../../core/services/prism.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: false
})
export class HomeComponent implements AfterViewInit {
  exampleCode: string = `
fetch('https://127.0.0.1:8000/posts/1')
  .then(response => response.json())
  .then(json => console.log(json))
  `;
  exampleOutput: string = `
{
  id: 1,
  title: '...',
  content: '...',
  user: 1
}
  `;
  @ViewChild('outputCode', { static: false }) outputCodeElement?: ElementRef<HTMLElement>;

  constructor(
    private prismService: PrismService
  ) {}

  ngAfterViewInit(): void {
    this.prismService.highlightAll();
  }

}
