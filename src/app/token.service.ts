import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  public  static clearTokenTime(): void {

      const date_now = Date.now();
      const token_info  = JSON.parse(localStorage.getItem('token_info'));
      if (token_info) {
          const hours = Math.abs(date_now - token_info.date) / 36e5;
          if (hours > 1 ) {
            localStorage.removeItem('token_info');
            localStorage.removeItem('token');
              console.log('cleared_token');
          }
      }
    }

    public static getTokenUser(token): string {
        const token_info  = JSON.parse(localStorage.getItem('token_info'));
        console.log('get_token');
        if ( token_info && token_info.token === token) {
          return token_info.user_id;
        } else {
          return null;
        }

      }

    public static setToken(user_id: string, token: string): void {
    const a = Date.now();
    const data = {
      'date': a,
        'token': token,
        'user_id': user_id,
    };
        localStorage.setItem('token', token);
        localStorage.setItem('token_info', JSON.stringify(data));
        console.log('put token');
    }


}
