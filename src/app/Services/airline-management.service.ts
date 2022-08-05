import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {  Observable } from 'rxjs';
import { FilghtSearch } from 'src/app/Models/FlightSearch';
import {map} from 'rxjs/operators';
import { HttpErrorResponse,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AirlineManagementService {

  baseUrl:string=''
  url:string=''


    constructor(private http: HttpClient) {
      this.baseUrl='https://localhost:7120/api/AirlineManagement/';
   }

   
    SearchFlight(source:string,destination:string,deptdate:string):Observable<FilghtSearch[]>{
      const headers= new HttpHeaders({'content-type':'application/json','No-Auth':'True'})
       this.url=this.baseUrl+'SearchFlight'+'?source='+source+'&destination='+destination+'&date='+deptdate;
       return this.http.get<FilghtSearch[]>(this.url,{headers:headers});
     }

     getAirline():Observable<any[]>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'getAirlines';
       return this.http.get<any[]>(this.url,{headers:headers});
     }
     
     provideDiscount():Observable<any>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'ProvideDiscount';
       return this.http.post<any>(this.url,{headers:headers});
     }

     getScheduledFlighs():Observable<any[]>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'getAirlineSchedule';
       return this.http.get<any[]>(this.url,{headers:headers});
     }

     getFlights():Observable<any[]>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'getFlights';
       return this.http.get<any[]>(this.url,{headers:headers});
     }

     getAirlineId(name:any):Observable<any[]>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'getAirlineByName'+'?name='+name;
       return this.http.get<any[]>(this.url,{headers:headers});
     }

     addAirline(data:any):Observable<any[]>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'AddAirline';
       return this.http.post<any[]>(this.url,data,{headers:headers});
     }

     addFlight(data:any):Observable<any[]>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'AddFlight';
       return this.http.post<any[]>(this.url,data,{headers:headers});
     }

     addSchedule(data:any):Observable<any[]>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'ScheduleFlight';
       return this.http.post<any[]>(this.url,data,{headers:headers});
     }

     blockAirline(airlinename:string,airlinecode:string,status:boolean):Observable<any[]>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'BlockAirline'+'?airlineName='+airlinename+'&airlineCode='+airlinecode+'&status='+status;
       return this.http.put<any[]>(this.url,{headers:headers});
     }

     blockflight(code:string,status:boolean):Observable<any[]>{
      
      const headers= new HttpHeaders({'content-type':'application/json'})
       this.url=this.baseUrl+'BlockFlight'+'?flightcode='+code+'&status='+status;
       return this.http.put<any[]>(this.url,{headers:headers});
     }
}
