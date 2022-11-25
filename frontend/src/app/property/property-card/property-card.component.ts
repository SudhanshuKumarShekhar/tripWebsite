import { Component, Input, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from 'src/app/booking-dialog/booking-dialog.component';
import { UserServiceService } from 'src/app/services/user-service.service';
import { EditPropertyComponent } from '../edit-property/edit-property.component';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {
  logginUser!:any
    @Input() property: any
    @Input()   hideIcons!: boolean;

  constructor(private dialog:MatDialog,private fb:FormBuilder,private auth:UserServiceService) { }
  ngOnInit(): void {
  }
  openDialog(property:Event): void {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width:'10000px',
      data:property
      });

    }
   //for login user check
   loggedinUser(){
    //this.logginUser =JSON.parse(localStorage.getItem('userdata')as string);
    this.logginUser = this.auth.getDecodedAccessToken(this.auth.getToken()!);
    return this.logginUser;
  }
  // edit location details
  openDialogEdit(property:Event){
    const dialogRef = this.dialog.open(EditPropertyComponent, {
      width:'1000px',
      data:property
      });
  }
}

