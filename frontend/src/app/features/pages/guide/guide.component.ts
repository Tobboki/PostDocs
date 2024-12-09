import { Component, AfterViewInit } from '@angular/core';
import { PrismService } from '../../../core/services/prism.service';
@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.css',
  standalone: false
})
export class GuideComponent {
  constructor( private prismService: PrismService ) {}

  ngAfterViewInit(): void {
    this.prismService.highlightAll();
  }
}
