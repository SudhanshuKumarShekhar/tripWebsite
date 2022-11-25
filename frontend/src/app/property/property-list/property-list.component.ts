
import { Component, OnInit } from '@angular/core';
import { TripServiceService } from 'src/app/services/trip-service.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  Properties: any;
  constructor(private tripService:TripServiceService) { }

  ngOnInit(): void {
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

}
