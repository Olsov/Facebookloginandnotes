import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocialLoginModule, AuthServiceConfig} from 'angularx-social-login';
import {FacebookLoginProvider} from 'angularx-social-login';
import {getAuthServiceConfigs} from '../socialloginConfig';
import { LoginComponent } from './login/login.component';
import { HttpClientModule} from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { UserInfoService} from './user-info.service';
import { NotesComponent } from './notes/notes.component';
import {JwtModule} from '@auth0/angular-jwt';

export function tokenGetter() {
    return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    NotesComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      SocialLoginModule,
      JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
              whitelistedDomains: ['localhost:4200', 'facebook.com'],
          }
      })
  ],
  providers: [
      { provide: AuthServiceConfig,
        useFactory: getAuthServiceConfigs
      },
      UserInfoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
