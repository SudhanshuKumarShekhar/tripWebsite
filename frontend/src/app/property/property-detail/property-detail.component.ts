
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BookingDialogComponent } from 'src/app/booking-dialog/booking-dialog.component';
import { DetailForTrip } from 'src/app/Model/trip';
import { TripServiceService } from 'src/app/services/trip-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  @Input()   hideIcons!: boolean;
  public propertyId!: number;
  trip!:any
  logginUser!:any
  constructor(private route: ActivatedRoute,private auth:UserServiceService,private tripService:TripServiceService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.propertyId = +this.route.snapshot.params['id'];
    this.TripDetail();
  }
  TripDetail(){
    this.tripService.getAllProperties().subscribe(res=>{
    this.trip = res.find((a:any)=>{
      return (a.id === this.propertyId);
    });
    },err=>{
      alert("somthing is wrong!!")
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width:'10000px',
      data: this.trip
      });

    }

     //check login user
   loggedinUser(){
    //this.logginUser =JSON.parse(localStorage.getItem('userdata')as string);
    this.logginUser = this.auth.getDecodedAccessToken(this.auth.getToken()!);
    return this.logginUser;
  }

}
