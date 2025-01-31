import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'master-data-management-web';
  showLogo1: boolean = true;
  showLogo2: boolean = false;
elementid: any;
  togglemenu(){
    if(this.showLogo1 == false){
      this.showLogo1 = true;
    }
    else{
      this.showLogo1 = false;
    }
    if(this.showLogo2 == false){
      this.showLogo2 = true;
    }
    else{
      this.showLogo2 = false;
    }
    let arrow:any = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
    }
    let sidebar:any = document.querySelector(".sidebar");
    let sidebarBtn:any = document.querySelector(".bs-menu");
    console.log(sidebarBtn);
      sidebar.classList.toggle("close");
  }
  togglesubmenu($event:any,elementid:string){
    console.log("working",$event)
    try{
      document.getElementById(elementid)?.classList.toggle("showMenu");
    }
    catch(e:any){
      
    }
  }
}
