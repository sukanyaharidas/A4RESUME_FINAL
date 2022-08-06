import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

 model: any = {};
 
 model2: any = {};

  constructor(public http:HttpClient) { }

  userSignup(users:any){
    console.log(users);
    return this.http.post<any>('http://localhost:4000/signup', {users});
    }


  login(authData:any){
    console.log(authData);
    return this.http.post<any>('http://localhost:4000/login',{authData});
  
    }
    getuserdata(id:any){
      return this.http.get('http://localhost:4000' +id)
    }

    adminLogin(data:any){
      console.log(data);
      return this.http.post<any>('http://localhost:4000/login_admin', {data});
    }


    loggedIn(){
     
      return !!localStorage.getItem('token');
    }

    getToken(){
      return  localStorage.getItem('token');
    }

    getName(){

      console.log("reqst received");
      return this.http.get('http://localhost:4000/username')
    }



    savenameAdmin(data:any){
      return this.http.post<any>('http://localhost:4000/changeAdminUname', {data});
    }

    savepwdAdmin(data:any){
      return this.http.post<any>('http://localhost:4000/changeAdminPwd', {data});
    }




    getusercred(){
      return this.http.get('http://localhost:4000/api/displayusercred')
    }
    deleteusercred(id:any){
      return this.http.delete('http://localhost:4000/api/deleteusercred/'+id)
    }

    mailsend(mail:any){
    return this.http.post('http://localhost:4000/api/sendmail',{mail})
    }

}
