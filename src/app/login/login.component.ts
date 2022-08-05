import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:any=FormGroup
  constructor(private fb:FormBuilder,private _userservice :UserService,private _toastrservice:ToastrService,
    private _router:Router) { }



  ngOnInit(): void {
    this.login=this.fb.group({
      UserName:['',Validators.required],
      Password:['',Validators.required],
      
    });
  }

  Onlogin(data:any){
  
    this._userservice.loginUser(data.value)
  .subscribe(
    (data)=>{
    console.log(data)
    //this._toastrservice.success("Login successfull!!");
    localStorage.setItem('user_token',data.token)
    localStorage.setItem('role',data.role)
     this.login.reset();
     this._router.navigate(['/home']);

    },
    err =>{
    console.log(err);
     this._toastrservice.error(err.error.status+" : "+err.error.message);
     this.login.reset();
    });

  }
}
