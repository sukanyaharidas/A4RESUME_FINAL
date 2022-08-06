import { Component, OnInit } from '@angular/core';
import { ResumeserviceService } from '../resumeservice.service';
import { AuthServiceService } from '../auth-service.service';
import { NgToastService } from 'ng-angular-popup';


import  jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-template2',
  templateUrl: './template2.component.html',
  styleUrls: ['./template2.component.css']
})
export class Template2Component implements OnInit {
  Data:any={}
  id:any='temp2';
  imageUrl:String='';
  show:boolean=false
  constructor(private resumeservice:ResumeserviceService, public auth:AuthServiceService, public toast:NgToastService) { }

  ngOnInit(): void {

    this.resumeservice.getdata().subscribe((data:any)=>{
      this.Data = JSON.parse(JSON.stringify(data))
      console.log(this.Data);
      this.imageUrl=data.profileImage;
    })
   

  }

  downloadpdf()
    {
      
    let data = document.getElementById('contentToConvert') as HTMLElement
    html2canvas(data).then(canvas => {
    // Few necessary setting options
    var imgWidth = 208;
    var pageHeight = 295;
    var imgHeight = 280;
    var heightLeft = imgHeight;
     
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('new-file.pdf'); // Generated PDF
    });

    }
    saveTemp(){
      this.resumeservice.sendTempid(this.id);
    }
    

    sendmail2(){
      this.auth.mailsend('http://localhost:4200/temp2link').subscribe((mail:any)=>{
        var respons = JSON.parse(JSON.stringify(mail))
        // console.log("happened")
        this.toast.success({detail:"Success Message",summary:"Mail Sent",duration:5000})
    })
    }
    

}
