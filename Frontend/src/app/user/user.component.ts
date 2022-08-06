import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  name='';
  role:any=''
  constructor(public authservice:AuthServiceService, public elementRef:ElementRef) { }

  ngOnInit(): void {
    this.role=localStorage.getItem('role');
    console.log("role is",this.role);
    this.authservice.getName().subscribe((data:any)=>{
   
    this.name=data.fname.toUpperCase();

   console.log("my name is",this.name);
})
  }



} 
