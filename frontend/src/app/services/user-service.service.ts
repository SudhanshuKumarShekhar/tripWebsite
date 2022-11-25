import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserForRegister, UserForLogin } from '../Model/user';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private http: HttpClient) { }
  baseServerUrl= "https://localhost:44322/api/User/";
  getUserDetails(userName:any):Observable<any>{
    return this.http.get<any>(`${this.baseServerUrl}`+userName)
  }
  registerUser(user: UserForRegister):Observable<any>{
    return this.http.post<any>(`${this.baseServerUrl}register`, user)
  }
  authUser(user: UserForLogin) :Observable<any>{
    return this.http.post<any>(this.baseServerUrl+'authenticate',user)
  }
  signOut(){
    return localStorage.removeItem('token');
  }
  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
