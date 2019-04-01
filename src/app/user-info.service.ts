import { Injectable } from '@angular/core';
import {UserLocal} from './userLocal';
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor() { }
    public  setUser(id: string, data: object): void {
      localStorage.setItem(id, JSON.stringify(data));
    }
    public  getUser(id: string ): UserLocal {
      return JSON.parse(localStorage.getItem(id));
    }
}
