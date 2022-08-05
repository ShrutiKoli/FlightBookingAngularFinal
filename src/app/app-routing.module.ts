import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { AddAirlineComponent } from './add-airline/add-airline.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { UserhistoryComponent } from './userhistory/userhistory.component';
const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
    
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  
  {
    path:'addAirline',
    component:AddAirlineComponent,
    canActivate:[AuthGuard],
    data:{role:'Admin'}
  },
  {
    path:'addflight',
    component:AddFlightComponent,
    canActivate:[AuthGuard],
    data:{role:'Admin'}
  },
  {
    path:'addSchedule',
    component:AddScheduleComponent,
    canActivate:[AuthGuard],
    data:{role:'Admin'}
  },
  {
    path:'user-booking',
    component:UserBookingComponent,
    canActivate:[AuthGuard],
    data:{role:'User'}
  },
  {
    path:'userhistory',
    component:UserhistoryComponent,
    canActivate:[AuthGuard],
    data:{role:'User'}
  },
  
  {
    path:'',
    component:HomeComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
