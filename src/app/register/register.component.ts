import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  register:any=FormGroup
  constructor(private fb:FormBuilder,private _userservice :UserService,private _toastrservice:ToastrService) { }

  ngOnInit(): void {
    this.register=this.fb.group({
      UserName:['',Validators.required],
      Password:['',Validators.required],
      Email:['']
    })
  }

  Onregister(data:any){
    this._userservice.registerUser(data.value)
  .subscribe(
    (data)=>{
    console.log(data)
    this._toastrservice.success(data.message);
     this.register.reset();
    },
    err =>{
    console.log(err);
     this._toastrservice.error(err.error.status+" : "+err.error.message);
     this.register.reset();
    });

  }

}
