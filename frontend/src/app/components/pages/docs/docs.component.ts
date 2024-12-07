import { AfterViewInit, Component, OnInit, output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrismService } from '../../../core/services/prism.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

interface HTTPRequestExample {
  name: string;
  sectionId: string;
}
interface CodeExample {
  id: string;
  title: string;
  code: string;
  output: string;
}

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css'],
  standalone: false
})
export class DocsComponent implements OnInit, AfterViewInit {
  requestExamples: HTTPRequestExample[] = [
    {
      name: 'Getting a resource',
      sectionId: 'getting-a-resource'
    },
    {
      name: 'Listing all resources',
      sectionId: 'listing-all-resources'
    },
    {
      name: 'Creating a resource',
      sectionId: 'creating-a-resource'
    },
    {
      name: 'Updating a resource',
      sectionId: 'updating-a-resource'
    },
    {
      name: 'Patching a resource',
      sectionId: 'patching-a-resource'
    },
    {
      name: 'Deleting a resource',
      sectionId: 'deleting-a-resource'
    },
    {
      name: 'Filtering resources',
      sectionId: 'filtering-resources'
    },
    {
      name: 'Listing nested resources',
      sectionId: 'listing-nested-resources'
    }
  ];

  codeExamples : CodeExample[] = [
    {
      id: 'getting-a-resource',
      title: 'Getting a resource',
      code: `
// This will return all the posts that belong to the first user
fetch('https://localhost:8000/posts/1')
  .then((response) => response.json())
  .then((json) => console.log(json));
      `,
      output:`
{
  id: 1,
  title: '...',
  body: '...',
  userId: 1
}
      `
    },
    {
      id: 'listing-all-resources',
      title: 'Listing all resources',
      code: `
fetch('https://localhost:8000/posts')
  .then((response) => response.json())
  .then((json) => console.log(json));
      `,
      output:`
[
{ id: 1, title: '...' /* ... */ },
{ id: 2, title: '...' /* ... */ },
{ id: 3, title: '...' /* ... */ },
/* ... */
{ id: 100, title: '...' /* ... */ },
];
      `
    },
    {
      id: 'creating-a-resource',
      title: 'Creating a resource',
      code: `
fetch('https://localhost:8000/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
      `,
      output:`
{
  id: 101,
  title: 'foo',
  body: 'bar',
  userId: 1
}
      `
    },
    {
      id: 'updating-a-resource',
      title: 'Updating a resource',
      code: `
fetch('https://localhost:8000/posts/1', {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
      `,
      output:`
{
  id: 1,
  title: 'foo',
  body: 'bar',
  userId: 1
}
      `
    },
    {
      id: 'patching-a-resource',
      title: 'Patching a resource',
      code: `
fetch('https://localhost:8000/posts/1', {
  method: 'PATCH',
  body: JSON.stringify({
    title: 'foo',
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
      `,
      output:`
{
  id: 1,
  title: 'foo',
  body: '...',
  userId: 1
}
      `
    },
    {
      id: 'deleting-a-resource',
      title: 'Deleting a resource',
      code: `
fetch('https://localhost:8000/posts/1', {
  method: 'DELETE',
});
      `,
      output:``
    },
    {
      id: 'filtering-resources',
      title: 'Filtering resources',
      code: `
// This will return all the posts that belong to the first user
fetch('https://localhost:8000/posts?userId=1')
  .then((response) => response.json())
  .then((json) => console.log(json));
      `,
      output:``
    },
    {
      id: 'listing-nested-resources',
      title: 'Listing nested resources',
      code: `
// This is equivalent to /comments?postId=1
fetch('https://localhost:8000/posts/1/comments')
  .then((response) => response.json())
  .then((json) => console.log(json));
      `,
      output:``
    },
  ]
  // variable used to specify the active or on screen section
  activeSection: string = '';

  // boolean to hide the Sidenav component when false!
  hideSidenav: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private prismService: PrismService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    // Uses the fragment to specify the section
    this.route.fragment.subscribe((section) => {
      this.jumpToSection(section);
    });

  }

  ngAfterViewInit(): void {

    // Use the prism lib to highlight and parse all the code snippets in the component
    this.prismService.highlightAll();

    // Hide Sidenav on certain breakpoints
    this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Tablet])
    .subscribe((result) => {
      this.hideSidenav = result.matches;
    });
  }

  // Scrolls to to the specified section in the button text
  jumpToSection(sectionId: string | null): void {
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      this.activeSection = sectionId;
    }
  }
}
