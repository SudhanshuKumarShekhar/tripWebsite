import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { DeleteDialogService } from '../delete-dialog.service';
import { UserForLogin, UserForRegister } from '../Model/user';
import { BookingService } from '../services/booking.service';
import { UserServiceService } from '../services/user-service.service';


@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.component.html',
  styleUrls: ['./mybooking.component.css']
})
export class MybookingComponent implements OnInit {

  logginUser!:any
  logginUserDetails!:UserForLogin;
  locationId!:any;
  locationDetail!:any;
  displayedColumns: string[] = ['Location','Address','Name','Mobile','Date','Person','TotalPrice','Book'];
  dataSource!:MatTableDataSource<any>;
  constructor(private BookingService:BookingService, private dialogService:DeleteDialogService,
    private auth:UserServiceService,private toast:NgToastService) { }

  ngOnInit(): void {
    this.setDetails();
    this.getAllBookinDetails();

  }
  setDetails(){
       //this.logginUser =JSON.parse(localStorage.getItem('userdata')as string);
       this.logginUser = this.auth.getDecodedAccessToken(this.auth.getToken()!);
       this.auth.getUserDetails(this.logginUser.unique_name).subscribe(
         {next:(res)=>{
           this.logginUserDetails = res;
           this.logginUserDetails.token=this.auth.getToken()!
           console.log(this.logginUserDetails);
         },error:(err)=>{
             console.log('httperror: ');
             console.log(err);
         }
         });
  }
  getAllBookinDetails(){

      console.log(this.logginUserDetails.id);
    if(this.logginUser.role=='admin'){
      this.BookingService.getAllBooking().subscribe(
        {next:(data:any)=>{this.dataSource = new MatTableDataSource(data);
          console.log(data);
        },error:(err)=>{
            console.log('httperror: ');
            console.log(err);
        }
        });
    }
    else{
      this.BookingService.getAllBookingDetails(this.logginUserDetails.id).subscribe(
        {next:(data:any)=>{this.dataSource = new MatTableDataSource(data);
          console.log(data);
        },error:(err)=>{
            console.log('httperror: ');
            console.log(err);
        }
        });
    }

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
// cancel booking of user
  cancelBooking(id:any){
    this.dialogService.openConformDialog()
    .afterClosed().subscribe(value=>{
      if(value){
        this.BookingService.deleteBooking(id).subscribe(res=>{
          this.toast.info({detail:"info Message",summary:"Delete Successfully!!",duration:5000})
         // alert("Delete Successfully!!");
          this.getAllBookinDetails();
        },err=>{this.toast.error({detail:"Error Message",summary:"Somthing in wrong!!",duration:5000})
         // alert('Somthing in wrong')
        });
      }
    });

  }


}
