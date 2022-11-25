import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/services/user-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  /**for hide and show the password **/
  type: string ="password";
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash";
  loginForm!:FormGroup;
  constructor(private router: Router,private loginService:UserServiceService,private http:HttpClient,private fb:FormBuilder,private toast:NgToastService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName:['', Validators.required],
      password:['', Validators.required]
    })
  }
  onLogin() {

    this.loginService.authUser(this.loginForm.value).subscribe({
      next:(res=>{
      if(res.success){
        //localStorage.setItem('userdata',JSON.stringify (res.userDetails));
        //alert(res.message);
        this.toast.success({detail:"Success Message",summary:res.message,duration:5000})
        this.loginForm.reset();
        this.loginService.storeToken(res.token);
         this.router.navigate(['/']);
      }
      else{
        this.toast.success({detail:"Error Message",summary:"login not Successful!!",duration:5000})
        //alert(' login not Successful!!');
      }
      }),
      error:(err)=>{
        this.toast.error({detail:"Error Message",summary:err?.error.message,duration:5000})
        //alert(err?.error.message)
      }
    })
}
hideShoewPassword(){
  this.isText =!this.isText;
  this.isText ? this.eyeIcon ="fa-eye": this.eyeIcon ="fa-eye-slash" ;
  this.isText? this.type = "text":this.type = "password";
}
}


/**
 * const member = res;
    if(member){
      localStorage.setItem('userdata',JSON.stringify (member));
      alert(res);
      this.loginForm.reset();
      this.router.navigate(['/']);
    }
    else{
      alert(' login not Successful!!');
    }
    },err=>{
      alert("somthing is wrong!!")
    })
 */
