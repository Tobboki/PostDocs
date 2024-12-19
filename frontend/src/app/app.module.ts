import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GuideComponent } from './features/pages/guide/guide.component';
import { CodeSnippetComponent } from './shared/components/code-snippet/code-snippet.component';
import { DocsComponent } from './features/pages/docs/docs.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule} from '@angular/material/sidenav';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { NotFoundComponent } from './features/pages/not-found/not-found.component';
import { HomeComponent } from './features/pages/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeManagerService } from './core/services/theme-manager.service';
import { provideHttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    GuideComponent,
    CodeSnippetComponent,
    DocsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatSidenav,
    MatSidenavContent,
    MatSidenavContainer,
    MatButtonModule,
    MatButton,
    MatToolbar,
    MatIconModule,
    MatIcon,
    MatSlideToggleModule,
    AsyncPipe
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    ThemeManagerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
