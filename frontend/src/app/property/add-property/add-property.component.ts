import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { TripServiceService } from 'src/app/services/trip-service.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

 @ViewChild('formTabs')
  formTabs!: TabsetComponent;
 addPropertyForm!: FormGroup;

  tripView ={
    name:'',
    price:null,
    address:'',
    description:'',
    about:'',
    rating:'',
    reviews:''
  };
  constructor(private fb:FormBuilder,
    private tripService:TripServiceService,private router:Router,private toast:NgToastService) { }

  ngOnInit(): void {
    this.createAddTripForm();
  }
  url="";
  onselectFile(e:any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload= (event:any)=>{
        this.url= event.target.result;
      }
    }
  }
  createAddTripForm(){
    this.addPropertyForm= this.fb.group({
      name:[null,Validators.required],
      price:[null,Validators.required],
      address:[null,Validators.required],
      description:[null],
      about:['dfsf'],
      rating:[2.4],
      reviews:['200']
    });
  }

  selectTab(tabId: number) {
    if (this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
  onSubmit(){
    this.tripService.addTripDetails(this.addPropertyForm.value).subscribe({
      next:(res=>{
       // alert(res.message);
       this.toast.success({detail:"Success Message",summary:res.message,duration:5000})
       this.addPropertyForm.reset();
       this.router.navigate(['/'])
      }),
      error:(err)=>{
        this.toast.error({detail:"Error Message",summary:err?.error.message,duration:5000})
       // alert(err?.error.message)
      }
    })
    /**
    this.tripService.addTripDetails(this.addPropertyForm.value).subscribe(res=>{
      alert("Registration Successfully!!");
      this.addPropertyForm.reset();
      this.router.navigate(['/'])
    },err=>{
      alert('Somthing in wrong')
    });
    **/

  }



}
