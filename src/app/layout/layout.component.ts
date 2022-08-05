import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
checklogin():boolean{
  if(localStorage.getItem('user_token')!=null)
  return true;
  else
  return false
}
  Logout(){
    localStorage.removeItem('user_token');
    localStorage.removeItem('role');
 
  
    this._router.navigate(['/home'])
  }
  checkAdminRole():boolean{
    if(localStorage.getItem('role')=='Admin')
    return true;
    else
    return false;
  }
  checkUserRole():boolean{
    if(localStorage.getItem('role')=='User')
    return true;
    else
    return false;
  }

}
