import { catchError, Observable ,throwError} from 'rxjs';
import { Router } from '@angular/router'
import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpEvent,HttpUserEvent,HttpHandler, HttpErrorResponse,HttpResponse } from '@angular/common/http';

import { UserService } from '../Services/user.service';
import{tap} from 'rxjs';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    constructor(private _router:Router) { }
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        if(req.headers.get('No-Auth')=="True")
        return next.handle(req.clone());

        if(localStorage.getItem('user_token')!=null)
        {
            const clonereq=req.clone(
             {headers: req.headers.set("Authorization","Bearer "+localStorage.getItem('user_token'))
            });
            
            return next.handle(clonereq).pipe(
            tap(
                (succ :HttpEvent<any>)=>{
                    if(succ instanceof HttpResponse) 
                    {
                        console.log("Success");
                    }},
                    (err :HttpEvent<any>)=>{
                        if(err instanceof HttpResponse) 
                        {
                            console.log("error");
                            this._router.navigate(['/login']);
                        }}
            
            ));    
        }
       return throwError(this.handleError)
    }
        // Global error handler method 
    private handleError(errorResponse : HttpErrorResponse) 
    {
        let errorMsg : string;

        if(errorResponse.error instanceof Error) 
        {
             // A client-side or network error occurred. Handle it accordingly.
            errorMsg = "An error occured : " + errorResponse.error.message;
        } else 
        {
            // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMsg = `Backend returned code ${errorResponse.status}, body was: ${errorResponse.error}`;
        }

         return throwError(errorMsg);
    }

    
}