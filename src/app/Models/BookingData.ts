import { UserData } from "./userdetails";

export class BookingData{
    nameOfUser:string='';
    emailId:string='';
    airlineName:string='';
    flightCode:string='';
    pnr:string='';
    source:string='';
    destination:string='';
    fromDate:Date= new Date();
    toDate:Date= new Date();
    cost:number=0;
    noOfSeats:number=0;
    mealOption:string='';
    status:boolean=false;
    bookedDate:Date= new Date();
    userBookingDetails:any[]=[];
   

}