import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { TripServiceService } from 'src/app/services/trip-service.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {
  Properties: any;
  tripDetails:FormGroup = this.fb.group({
    id:[0],
    name:[''],
    address:[''],
    price:[0],
    description:['']
  })

  constructor(private fb:FormBuilder,private router:Router, private tripService:TripServiceService
    ,private toast:NgToastService,
    @Inject(MAT_DIALOG_DATA) public property:any,
    private dialogRef: MatDialogRef<EditPropertyComponent>) { }

  ngOnInit(): void {
    this.getAlltripData();
    this.setTripData();
  }
  setTripData(){
    this.tripDetails.controls['id'].setValue(this.property.id);
    this.tripDetails.controls['name'].setValue(this.property.name);
  this.tripDetails.controls['address'].setValue(this.property.address);
  this.tripDetails.controls['price'].setValue(this.property.price);
  this.tripDetails.controls['description'].setValue(this.property.description);
}
// for refarace the data instantly
getAlltripData(){
  this.tripService.getAllProperties().subscribe(
    data=>{
      this.Properties=data;
      console.log(data);
    },error=>{
        console.log('httperror: ');
        console.log(error);
    }
  );
}
onEdit(){

  this.tripService.updateTripDetails(this.property.id,this.tripDetails.value).subscribe(res=>{
    this.getAlltripData();
    this.dialogRef.close();
    this.toast.success({detail:"Success Message",summary:"update Successfully!!",duration:5000})
    //alert("update Successfully!!");
    this.tripDetails.reset();
  },err=>{
    this.toast.error({detail:"Error Message",summary:"Somthing in wrong",duration:5000})
    //alert('Somthing in wrong')
  });

}

}
