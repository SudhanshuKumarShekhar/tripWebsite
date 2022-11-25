import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  logginUser!:any
  loginDialog:boolean=false;

  constructor(private router:Router,private auth:UserServiceService) { }
  ngOnInit(): void {
  }


//for login user

  loggedin(){
    //this.logginUser =JSON.parse(localStorage.getItem('token')as string);
    //decode token
    if(this.auth.isLoggedIn())
         this.logginUser = this.auth.getDecodedAccessToken(this.auth.getToken()!);
    return this.logginUser;
  }

  onlogout(){
    this.router.navigate(['/']);
    //localStorage.removeItem('userdata');
   return this.auth.signOut();
  }

//dialog bar for userlogin details
profileOpen(){
  this.loginDialog=true;
}
    profileClose(){
      this.loginDialog=false;

    }
}
