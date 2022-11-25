import { Injectable } from '@angular/core';
import { CanActivate, Router,} from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:UserServiceService, private router:Router){}
  canActivate():boolean{
   if(this.auth.isLoggedIn()){
    return true;
   }
   else{
    return false;
   }
  }

}
