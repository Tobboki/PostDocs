import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { GuideComponent } from './components/pages/guide/guide.component';
import { DocsComponent } from './components/pages/docs/docs.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { PostsComponent } from './components/pages/posts/posts.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'PostDocs' },
  { path: 'guide', component: GuideComponent, title: 'PostDocs | Guide' },
  { path: 'docs', component: DocsComponent, title: 'PostDocs | Docs' },
  { path: 'posts', component: PostsComponent, title: 'PostPosts | Posts' },
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'PostDocs' }, /* Default Page */
  { path: '**', component: NotFoundComponent, title: 'PostDocs | Page Not Found' }, /* 404 Page */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
