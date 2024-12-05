import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GuideComponent } from './components/pages/guide/guide.component';
import { CodeSnippetComponent } from './components/code-snippet/code-snippet.component';
import { DocsComponent } from './components/pages/docs/docs.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule} from '@angular/material/sidenav';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { PostsComponent } from './components/pages/posts/posts.component';
import { HomeComponent } from './components/pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    GuideComponent,
    CodeSnippetComponent,
    DocsComponent,
    NotFoundComponent,
    PostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatSidenav,
    MatSidenavContent,
    MatSidenavContainer,
    MatButtonModule,
    MatButton,
    MatToolbar,
    MatIcon
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
