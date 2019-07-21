import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LogoutModule } from './auth/logout.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbPasswordAuthStrategy,
         NbAuthModule,
         NbAuthJWTToken,
         NbAuthJWTInterceptor,
         NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from './@theme/theme.module';
import { CoreModule } from './@core/core.module';
import { AuthGuard } from './service/auth-guard.service';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ThemeModule,
    AppRoutingModule,
    LogoutModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    HttpClientModule,
    NbThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://blogwebsite.us-east-2.elasticbeanstalk.com',
          login: {
            endpoint: '/auth/admin/login',
          },
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 500,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          },
        },
        logout: {
          redirectDelay: 500,
          strategy: 'email',
        },
      },
    }),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
  ],
  providers: [AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: () => false }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
