import { TmplAstRecursiveVisitor } from '@angular/compiler';
import {  Component,  Inject,  OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BookingService } from '../services/booking.service';
import { UserServiceService } from '../services/user-service.service';


@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.css']
})
export class BookingDialogComponent implements OnInit {
  totalPrice:any=0;
  mobile:string='';
  public closeIcon: Boolean =false;
  public conformIcon:Boolean =true;
  BookingDetailsForm!:FormGroup
  tripDetails:FormGroup = this.fb.group({
    Location:[''],
    Address:[''],
    Price:[0]
  })

  constructor(private fb:FormBuilder, private bookingService:BookingService,
    private router:Router,private toast:NgToastService, public auth:UserServiceService,
      @Inject(MAT_DIALOG_DATA) public getTripData:any,
      private dialogRef: MatDialogRef<BookingDialogComponent>
    ) { }
  ngOnInit(): void {
    this.createBookingDetailsForm();
    if(this.getTripData){
      this.setTripData();
    }
  }
  //login user details
  //logginUser =JSON.parse(localStorage.getItem('userdata')as string);
  logginUser = this.auth.getDecodedAccessToken(this.auth.getToken()!);

// setting data to trip dianemicaly
  setTripData(){
      this.tripDetails.controls['Location'].setValue(this.getTripData.name);
      this.tripDetails.controls['Address'].setValue(this.getTripData.address);
      this.tripDetails.controls['Price'].setValue(this.getTripData.price);
  }
  createBookingDetailsForm(){
    this.BookingDetailsForm = this.fb.group({
      name:['',Validators.required],
      email:['', [Validators.required, Validators.email]],
      mobile:['',Validators.required],
      date:['',[Validators.required, Validators.maxLength(10)]],
      person:['',Validators.required],
      locationId:[this.getTripData.id],
      logginUserId:[this.logginUser.id],
      totalPrice:[0]
    });
  }
  goIngForConformBooking(){
    this.closeIcon = true;
    this.conformIcon=false;
  }
  backToBooking(){
    this.BookingDetailsForm.reset();
    this.totalPrice=0;
    this.closeIcon = false;
    this.conformIcon=true;
  }
onSubmit(){
  //change mobile number num to string
  this.mobile= ''+this.BookingDetailsForm.get('mobile')?.value;
  this.BookingDetailsForm.controls['mobile'].setValue(this.mobile);
  // puting price to the value
  this.totalPrice= (this.getTripData.price)*(this.BookingDetailsForm.get('person')?.value);
  this.BookingDetailsForm.controls['totalPrice'].setValue(this.totalPrice);
 console.log(this.BookingDetailsForm.value)
}
bookingConform(){
  this.closeIcon=true;
  this.conformIcon=true;
  this.dialogRef.close();
  this.bookingService.addBookingDetails(this.BookingDetailsForm.value).subscribe({
    next:(res=>{
     this.toast.success({detail:"Success Message",summary:"Booking Successfully!!",duration:5000})
     //alert("Booking Successfully!!");
     this.BookingDetailsForm.reset();
     this.router.navigate(['/'])
    }),
    error:(err)=>{
      this.toast.error({detail:"Error Message",summary:'Somthing in wrong',duration:5000})
     // alert(err?.error.message)
    }
  })
  /*
  this.bookingService.addBookingDetails(this.BookingDetailsForm.value).subscribe(res=>{

  },err=>{
    alert('Somthing in wrong')
  });
  **/
  console.log(this.BookingDetailsForm.value);
}


}


