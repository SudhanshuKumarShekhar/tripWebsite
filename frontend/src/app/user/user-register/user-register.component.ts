import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserForRegister } from 'src/app/Model/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
   /**for hide and show the password **/
   type: string ="password";
   isText: boolean = false;
   eyeIcon:string = "fa-eye-slash";
  registerationForm!: FormGroup;
    constructor(private fb: FormBuilder,
                private authService: UserServiceService,
                private router:Router,
                private toast:NgToastService) { }

  ngOnInit(): void {
    this.createRegisterationForm();
  }
  hideShoewPassword(){
    this.isText =!this.isText;
    this.isText ? this.eyeIcon ="fa-eye": this.eyeIcon ="fa-eye-slash" ;
    this.isText? this.type = "text":this.type = "password";
  }
  createRegisterationForm() {
    this.registerationForm =  this.fb.group({
        userName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(4)]],
        mobile: [null, [Validators.required, Validators.maxLength(10)]],
        type:['user'],
        token:['']
    });
}

  onSubmit(){
    console.log(this.registerationForm.value);
    this.authService.registerUser(this.registerationForm.value).subscribe({
      next:(res=>{
       // alert(res.message);
       this.toast.success({detail:"Success Message",summary:res.message,duration:5000})
        this.registerationForm.reset();
      this.router.navigate(['user/login']);
      }),
      error:(err)=>{
        this.toast.error({detail:"Error Message",summary:err?.error.message,duration:5000})
       // alert(err?.error.message)
      }
    })

}

}

