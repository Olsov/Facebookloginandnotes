import { Component, OnInit } from '@angular/core';
import { AuthService as SocialAuthService, FacebookLoginProvider } from 'angularx-social-login';
import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserInfoService} from '../user-info.service';
import {User} from '../user';
import {UserLocal} from '../userLocal';
import { TokenService} from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {
     login = false;
     loginUser: User;
     loginId: string;
  constructor(
      private socialAuthService: SocialAuthService,
      private http: HttpClient,
      private userInfoService: UserInfoService,
      private tokenService: TokenService ) {}

  ngOnInit() {
    this.tokenService.clearTokenTime();
    const token = localStorage.getItem('token');
    console.log(token);
    if ( token ) {
        const userId = this.tokenService.getTokenUser(token);
    if (  userId ) {
      console.log(userId);
      let user_info: UserLocal;
      user_info = this.userInfoService.getUser(userId);
      console.log(user_info);
      if (user_info) {
        this.login = true;
        this.userChange(user_info.name, user_info.picture);
          this.loginId = userId;
      }
    }
    }
  }
  public userChange(name: string, image: string): void {
    this.loginUser = new User();
    this.loginUser.name = name;
    this.loginUser.image = image;
  }
  public facebookLogout() {
      this.login = false;
      localStorage.removeItem('token');
      localStorage.removeItem('token_info');
  }
  public facebookLogin() {

    const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          console.log(userData.authToken);
          this.testApi(userData.authToken);
        }
    );
  }
  testApi(token: string): void {
    const headers = new HttpHeaders();
      headers.append('Content-type', 'application/json');
      this.http.get('https://graph.facebook.com/me?fields=name,picture&access_token=' + token).subscribe((next: User ) => {
        const user = {
          'name': next.name,
          'picture': next.picture.data.url,
          'token': token
        };
        this.tokenService.setToken(next.id, token);
        this.userInfoService.setUser(next.id, user);
        this.login = true;
        this.userChange(next.name, next.picture.data.url);
        this.loginId = next.id;
        console.log('login_id' + this.loginId);
      }, error => {
          console.log(error);
      });
  }
    sendToRestApiMethod(token: string): void {
    const headers = new HttpHeaders();
      headers.append('Content-type', 'application/json');
        this.http.post('https://www.facebook.com/dialog/oauth/?scope=first_name,last_name,picture', {token: token } , {headers: headers} )
        .subscribe(onSuccess => {
          console.log(onSuccess);
}, error => {
          console.log(error);
}
);
}
}
