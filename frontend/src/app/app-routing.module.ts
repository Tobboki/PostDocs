import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { GuideComponent } from './features/pages/guide/guide.component';
import { DocsComponent } from './features/pages/docs/docs.component';
import { NotFoundComponent } from './features/pages/not-found/not-found.component';
import { PostsComponent } from './features/pages/posts/posts.component';
import { loginGuard, PreventLoadGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'PostDocs' },
  { path: 'guide', component: GuideComponent, title: 'PostDocs | Guide' },
  { path: 'docs', component: DocsComponent, title: 'PostDocs | Docs' },
  { 
    path: 'posts',
    component: PostsComponent,
    title: 'PostPosts | Posts',
    canActivate: [loginGuard]
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
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
