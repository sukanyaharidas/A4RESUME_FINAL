import { Component, OnInit } from '@angular/core';
import { ResumeserviceService } from '../resumeservice.service';
import { NgToastService } from 'ng-angular-popup';
import  jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-template3',
  templateUrl: './template3.component.html',
  styleUrls: ['./template3.component.css']
})
export class Template3Component implements OnInit {
  Data:any={
    
   }
   imageUrl:String='';
   id:any='temp3';
   show:boolean=false

  constructor(private resumeservice:ResumeserviceService,public router:Router,private toast:NgToastService, public auth:AuthServiceService) {}
  ngOnInit() {
    
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
    var imgWidth = 210;
    var pageHeight = 295;
    var imgHeight = 300;
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
    
    sendmail3(){
      this.auth.mailsend('http://localhost:57854/temp3link').subscribe((mail:any)=>{
        var respons = JSON.parse(JSON.stringify(mail))
        // console.log("happened")
        this.toast.success({detail:"Success Message",summary:"Mail Sent",duration:5000})
    })
    }

    copylink(val: string){
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }
}
