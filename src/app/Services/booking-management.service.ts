import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {  Observable } from 'rxjs';
import { FilghtSearch } from 'src/app/Models/FlightSearch';
import {map} from 'rxjs/operators';
import { HttpErrorResponse,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingManagementService {
  baseUrl:string=''
  url:string=''
  constructor(private http: HttpClient) {
    this.baseUrl='https://localhost:7013/api/BookingManagement/';
    }

    getDataByEmail(data:any):Observable<any[]>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'GetHistory'+'?Email='+data;
       return this.http.get<any[]>(this.url,{headers:headers});
     }

     getDataByPnr(data:any):Observable<any[]>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'GetFlightDetails'+'?Pnr='+data;
       return this.http.get<any[]>(this.url,{headers:headers});
     }
     

     bookFlight(data:any):Observable<any[]>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'bookflight';
       return this.http.post<any[]>(this.url,data,{headers:headers});
     }

     appyDiscount(data:any):Observable<any>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'ApplyDiscount'+'?discountCode='+data;
       return this.http.post<any>(this.url,{headers:headers});
     }
     getDiscount():Observable<any>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'GetDiscount';
       return this.http.get<any>(this.url,{headers:headers});
     }
     cancelBooking(id:any):Observable<any[]>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'Cancel'+'?boookingid='+id;
       return this.http.put<any[]>(this.url,{headers:headers});
     }
     
}
