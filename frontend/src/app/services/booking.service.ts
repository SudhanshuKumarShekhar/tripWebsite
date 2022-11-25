import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingForTrip } from '../Model/trip';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }
  baseServerUrl= 'https://localhost:44322/api/';
    getAllBookingDetails(id:any){
      return this.http.get<any>(this.baseServerUrl+'MyBooking/'+id);
    }
    getAllBooking(){
      return this.http.get<any>(this.baseServerUrl+'MyBooking');
    }
    addBookingDetails(book: BookingForTrip) {
      return this.http.post<any>(this.baseServerUrl+'BookingDetails', book).pipe(map((res:any)=>{
        return res;
      }));
    }
    deleteBooking(id:number){
      return this.http.delete(this.baseServerUrl+'BookingDetails/'+id).pipe(map((res:any)=>{
        return res;
      }));
    }
}
