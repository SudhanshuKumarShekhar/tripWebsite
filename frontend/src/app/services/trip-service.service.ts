import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { DetailForTrip } from '../Model/trip';
@Injectable({
  providedIn: 'root'
})
export class TripServiceService {

  constructor(private http:HttpClient) { }
  baseServerUrl= 'https://localhost:44322/api/';
  getAllProperties(){
    return this.http.get<any>(this.baseServerUrl+'LocationDetails');
  }
  getProperties(id:any){
    return this.http.get<any>(this.baseServerUrl+'LocationDetails/'+id);
  }
  addTripDetails(trip: DetailForTrip) {
    return this.http.post<any>(this.baseServerUrl+'LocationDetails', trip).pipe(map((res:any)=>{
      return res;
    }));
  }
  updateTripDetails(id:any,trip:DetailForTrip){
    return this.http.put<any>(this.baseServerUrl+'LocationDetails/'+id, trip).pipe(map((res:any)=>{
      return res;
    }));
  }
deleteTripDetails(id:number){
  return this.http.delete(this.baseServerUrl+'LocationDetails/'+id).pipe(map((res:any)=>{
    return res;
  }));
}

}
