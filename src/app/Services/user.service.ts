import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../Models/user';
import { HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string=''
  url:string=''
  constructor(private http: HttpClient) {
    //this.baseUrl='https://localhost:7012/api/Auth/';
    this.baseUrl='https://localhost:7015/gateway/'

   }
   registerUser(user: User):Observable<HttpErrorResponse>{
    // const body={
    //   UserName:user.UserName,
    //   Email:user.Email,
    //   Password:user.Password
    // }
    const headers= new HttpHeaders({'content-type':'application/json','No-Auth':'True'})
    this.url=this.baseUrl+'register';
    console.log(this.url)
    return this.http.post<HttpErrorResponse>(this.url,user,{headers:headers});
   }
   loginUser(user: User):Observable<any>{
    // const body={
    //   UserName:user.UserName,
    //   Email:user.Email,
    //   Password:user.Password
    // }
    const headers= new HttpHeaders({'content-type':'application/json','No-Auth':'True'})
    this.url=this.baseUrl+'login';
    console.log(this.url)
    return this.http.post<any>(this.url,user,{headers:headers});
   }

  }