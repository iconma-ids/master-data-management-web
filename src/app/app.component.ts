import { DOCUMENT } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AppEventManager } from './shared/service/app-event-manager';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  title = 'master-data-management-web';
  showLogo1: boolean = true;
  showLogo2: boolean = false;
  menuData : any;
  appName:any;
  pathName:any="";
  ui="";
clientName:any;
tableName : any;
schemaName :any;
urlArray :any;
url:any;
applicationName:any;
elementid: any;
isBrowser: boolean;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    protected localStorageService: LocalStorageService,
    protected appEventManager: AppEventManager,
    private activatedRoute: ActivatedRoute,
    //private configurationSettingsService : ConfigurationSettingsService,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
   
  ) { debugger;
    this.isBrowser = isPlatformBrowser(this.platformId);  // Check if running in browser
  }

  ngOnInit(): void {debugger;
    this.pathName=window.location.pathname;
this.urlArray = this.pathName.split('/');
//if(this.urlArray[6] !== 'undefined' || this.urlArray[6] == 'list'){
  if(this.urlArray.length !== 8){
  this.ui = this.activatedRoute.snapshot.params['ui'];
  this.applicationName = this.activatedRoute.snapshot.params['appName'];
  this.clientName = this.activatedRoute.snapshot.params['clientName'];
  this.tableName = this.activatedRoute.snapshot.params['tableName'];
  this.schemaName=localStorage.getItem('schemaName')||"";

}
else{
this.url = this.urlArray[2];
this.applicationName = this.urlArray[3];
this.clientName = this.urlArray[4];
this.schemaName = this.urlArray[5];
this.tableName = this.urlArray[6];
}

const authtoken= this.$sessionStorage.retrieve('authenticationToken') || '';
    
const paramArr = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
const params:any = {};
paramArr.map(param => {
    const [key, val] = param.split('=');
    params[key] = decodeURIComponent(val);
})

    // this.pathName=window.location.pathname;
    // this.urlArray = this.pathName.split('/');

this.menuData = localStorage.getItem('menuData');
this.menuData = JSON.parse(this.menuData);

   
   debugger;

   const search = window.location.search;
   let token:any=search.split("=");
   console.log(token[1]); 



   let jwt=params['token'];
   this.appName=params['appName']==undefined?"ADMINISTRATION":params['appName'];
   let clientName = params['clientName']==undefined?"ICONMA":params['clientName'];
      localStorage.setItem("token", jwt);debugger;
      this.$localStorage.store('authenticationToken', jwt);
      this.$sessionStorage.store('authenticationToken', jwt);
      if(jwt == undefined){
        localStorage.setItem("token", authtoken);
        this.$localStorage.store('authenticationToken', authtoken);
        this.$sessionStorage.store('authenticationToken', authtoken);
        }   
      // this.configurationSettingsService.getMenuData(this.appName,clientName).subscribe((res : HttpResponse<any[]>) => {debugger;
      //  const data = res.body|| [];
      //  this.menuData = data;
      //  localStorage.setItem('menuData', JSON.stringify(this.menuData));
      //  if(this.tableName == "Role Management" || this.tableName == "Column Management" || this.tableName == "Menu Management" || this.tableName == "Configuration Management" || this.tableName == "User Group"){
      //   this.router.navigate(['/'+this.url,this.appName,this.clientName,this.tableName]);
      //  }
      // });

    
  }


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
