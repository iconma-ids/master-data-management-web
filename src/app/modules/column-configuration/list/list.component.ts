import { trigger, state, style, transition, animate } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
import { Subscription, combineLatest } from 'rxjs';

import { ColumnConfigurationService } from '../column-configuration.service';
import { ColumnConfigurationDeleteDialogComponent } from '../column-configuration-delete-dialog.component';

import { CommonModule } from '@angular/common';
import { EXCEL_TYPE } from '../../../shared/constants/input.constants';
import { ITEMS_PER_PAGE } from '../../../shared/constants/pagination.constants';
import { AppEventManager } from '../../../shared/service/app-event-manager';
import { CharacterLengthService } from '../../../shared/service/character-length.service';
import { IColumnConfiguration } from '../../../shared/shared/column-configuration.model';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: false,
})
export class ListComponent implements OnInit {

 
  appName: string='';
  // ui: string='';
  schama_name:string="";
  tableNam: string='';
  clientNam :any;
  schemaNam :any;
  configurationList = new MatTableDataSource();
  displayedConfigurationColumnsList: string[] = ['checkbox', 'action','columnOrder','columnName','columnType','columnAlias','foreignKeyColumn','foreignKeySchema','foreignKeyTable','schemaName','clientName','requiredField','regularExpression','app','ui','uniqueValue','display','tableName','compositKey','description'];
  configurationData: string[] = [ 'columnOrder','columnName','columnType','columnAlias','foreignKeyColumn','foreignKeySchema','foreignKeyTable','schemaName','clientName','requiredField','regularExpression','app','ui','uniqueValue','display','tableName','compositKey','description'];
  configurations: any;
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  closeResult: string | undefined;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  exportedConfigurationData: any;
  exportConfigurationData: any[] =[];
  characterLength : any;
  deleteItems : any[] = [];
  clientNameList:any;
  uiList:any;
  applicationList :any[]= [];
  deleteFlag: boolean = false;
  ischecked: boolean = false
  checkAllTrades: boolean = false
  filterValues = {
    columnOrder: '',
    columnName: '',
    columnType:'',
    columnAlias:'',
    foreignKeyColumn:'',
    foreignKeySchema:'',
    foreignKeyTable:'',
    clientName:'',
    schemaName:'',
    app:'',
    ui:'',
    regularExpression:'',
    requiredField:'',
    uniqueValue:'',
    display:'',
    active: '',
    tableName:'',
    compositKey:'',
    description:'',
}

get columnOrder() : any{
  return this.filterForm.get('columnOrder'); 
} 
get columnName() : any{
  
  return this.filterForm.get('columnName');
}

get tableName() : any{
  
  return this.filterForm.get('tableName');
}

get columnType() : any{
  
  return this.filterForm.get('columnType');
}
get columnAlias() : any{
 
  return this.filterForm.get('columnAlias');
}
get foreignKeyColumn() : any{
  
  return this.filterForm.get('foreignKeyColumn');
}
get foreignKeySchema() : any{
 
  return this.filterForm.get('foreignKeySchema');
}
get foreignKeyTable() : any{
 
  return this.filterForm.get('foreignKeyTable');
}
get clientName() : any{
 
  return this.filterForm.get('clientName');
}
get schemaName() : any{
 
  return this.filterForm.get('schemaName');
}
get regularExpression() : any{
 
  return this.filterForm.get('regularExpression');
}
get app() : any{
 
  return this.filterForm.get('app');
}
get ui() : any{
 
  return this.filterForm.get('ui');
}
get uniqueValue() : any{
 
  return this.filterForm.get('uniqueValue');
}
get requiredField() : any{
 
  return this.filterForm.get('requiredField');
}
get display() : any{
 
  return this.filterForm.get('display');
}
get active() : any{
  return this.filterForm.get('active');
} 
get compositKey() : any{
  return this.filterForm.get('compositKey');
} 
get description() : any{
  return this.filterForm.get('description');
}
formdata: FormData = new FormData();
editForm: FormGroup;
filterForm:FormGroup;
  constructor(
    protected activatedRoute: ActivatedRoute,
    private columnConfigurationService:ColumnConfigurationService,
    protected router: Router,
    protected modalService: NgbModal,
    private _liveAnnouncer: LiveAnnouncer,
    protected eventManager:AppEventManager,
    private characterLengthService : CharacterLengthService,
    private fb:FormBuilder
  ) {
    this.editForm = this.fb.group({
      id: [],
      ui: [null],
      clientName: [null],
      app: [null],
    });
  
    this.filterForm = this.fb.group({
      columnOrder: new FormControl(),
      columnName: new FormControl(),
      columnType: new FormControl(),
      columnAlias: new FormControl(),
      foreignKeyColumn: new FormControl(),
      foreignKeySchema: new FormControl(),
      foreignKeyTable: new FormControl(),
      ui: new FormControl(),
      app: new FormControl(),
      schemaName: new FormControl(),
      clientName: new FormControl(),
      regularExpression: new FormControl(),
      requiredField: new FormControl(),
      uniqueValue: new FormControl(),
      display: new FormControl(),
     active : new FormControl(),
     tableName : new FormControl(),
     compositKey : new FormControl(),
     description : new FormControl(),
    });
    
   }
  

  
  @ViewChild(MatSort)
  sort1!: MatSort;
  ngOnInit(): void {debugger;
    this.handleNavigation();
    this.registerChangeInCompanies();
    this.formSubscribe();
    this.filterConfiguration();
    this.appName='ADMINISTRATION';
    this.clientNam ='ICONMA';
    this.tableNam = 'column_management';
    this.schama_name = 'iplexr_conf';
    this.schemaNam = 'iplexr_conf';
    // this.appName = this.activatedRoute.snapshot.params['appName'];
    // this.clientNam = this.activatedRoute.snapshot.params['clientName'];
    // this.tableNam = this.activatedRoute.snapshot.params['tableName'];
    // this.schama_name=localStorage.getItem('schama_name')||"";
    // this.schemaNam=localStorage.getItem('schemaName')||"";

    this.columnConfigurationService.getClientNameList().subscribe((res : HttpResponse<any>) => {debugger;
      const data = res.body
     this.clientNameList = data;
    });

    this.columnConfigurationService.getApplicationList().subscribe((res : HttpResponse<any>) => {debugger;
      const data = res.body
     this.applicationList = data;
    });
    this.columnConfigurationService.getUiList().subscribe((res : HttpResponse<any>) => {debugger;
      const data = res.body
     this.uiList = data;
    });
  }

  protected handleNavigation(): void {debugger;
    combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, (data: Data, params: ParamMap) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === 'asc';
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    }).subscribe();
  }

  open1(filter: any) {
    this.modalService.open(filter, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  loadPage(page?: number, dontNavigate?: boolean): void {debugger;
    const pageToLoad: number = page || this.page || 1;
debugger;
    this.columnConfigurationService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IColumnConfiguration[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
        () => this.onError()
      );
  }

  registerChangeInCompanies(): void {
    this.eventSubscriber = this.eventManager.subscribe('palletTypeListModification', () => this.loadPage());
  }
  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IColumnConfiguration[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate([window.location.pathname], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.configurations = data || [];
    this.configurations.forEach((containerType:any,index:any)=>{
      this.configurations![index].isExpanded=false;
     });
      this.configurationList.data = this.configurations;
      this.configurationList.sort = this.sort1;
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  trackId(index: number, item: IColumnConfiguration): number {
      return item.id!;
  }

  delete(columnConfiguration: IColumnConfiguration): void {
    const modalRef = this.modalService.open(ColumnConfigurationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.columnConfiguration = columnConfiguration;
  }
  selectFile(event: any): void {
    const file: File = event.target.files.item(0);
    const formData = new FormData();
    formData.append('columnConfigurationFile', file);
    this.columnConfigurationService.uploadFiles(formData).subscribe((res: any) => {
      const data = res.body || [];
      this.exportAsExcelFile(data, 'ColumnConfiguration-Data');
    }      
    );
   
  }
  exportToExcel(): void {
    // this.columnConfigurationService
    // .query({ }).subscribe(
    //   (responce: { body: never[]; }) => {
    //     this.exportedConfigurationData = responce.body || [];
    //     console.log(this.exportedConfigurationData);
    //     this.exportedConfigurationData.forEach((obj: any,index:any) => {
        
         
    //       let jsondata1: any = {};
    
    //       Object.values(this.displayedConfigurationColumnsList).forEach((key) => {
    
    
    
    //         let a = {};
    //         a = { [key]: obj[key] };
    //         jsondata1 = Object.assign(jsondata1, a);
    
    
    
    //       });
    //       delete jsondata1['id'];
    //        delete jsondata1['action']; 
    //       delete jsondata1['checkbox']; 
    //       this.exportConfigurationData.push(jsondata1);
           
    //          });
    //          this.exportAsExcelFile(
    //           this.exportConfigurationData,
    //           'Configuration-Data'
    //         );
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    // const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    // const myworkbook: XLSX.WorkBook = {
    //   Sheets: { data: myworksheet },
    //   SheetNames: ['data'],
    // };
    // const excelBuffer: any = XLSX.write(myworkbook, {
    //   bookType: 'xlsx',
    //   type: 'array',
    // });
    // this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
   // FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }
  announceSortChange(sortState: Sort) {
   
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  formSubscribe() {
   
   
    this.columnAlias.valueChanges.subscribe((columnAliasValue: any) => {
      
      this.filterValues['columnAlias'] = columnAliasValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.columnType.valueChanges.subscribe((columnTypeValue: any) => {
     
      this.filterValues['columnType'] = columnTypeValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.columnOrder.valueChanges.subscribe((columnOrderValue: any) => {
     
      this.filterValues['columnOrder'] = columnOrderValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.columnName.valueChanges.subscribe((columnNameValue: any) => {
     
      this.filterValues['columnName'] = columnNameValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.foreignKeyColumn.valueChanges.subscribe((foreignKeyColumnValue: any) => {
      
      this.filterValues['foreignKeyColumn'] = foreignKeyColumnValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.foreignKeySchema.valueChanges.subscribe((foreignKeySchemaValue: any) => {
     
      this.filterValues['foreignKeySchema'] = foreignKeySchemaValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.foreignKeyTable.valueChanges.subscribe((foreignKeyTableValue: any) => {
     
      this.filterValues['foreignKeyTable'] = foreignKeyTableValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.schemaName.valueChanges.subscribe((schemaNameValue: any) => {
      
      this.filterValues['schemaName'] = schemaNameValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.clientName.valueChanges.subscribe((clientNameValue: any) => {
     
      this.filterValues['clientName'] = clientNameValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.tableName.valueChanges.subscribe((tableNameValue: any) => {
     
      this.filterValues['tableName'] = tableNameValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.regularExpression.valueChanges.subscribe((regularExpressionValue: any) => {
     
      this.filterValues['regularExpression'] = regularExpressionValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.app.valueChanges.subscribe((appValue: any) => {
     
      this.filterValues['app'] = appValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.ui.valueChanges.subscribe((uiValue: any) => {
      
      this.filterValues['ui'] = uiValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.requiredField.valueChanges.subscribe((requiredFieldValue: any) => {
      
      this.filterValues['requiredField'] = requiredFieldValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.uniqueValue.valueChanges.subscribe((uniqueValueValue: any) => {
      
      this.filterValues['uniqueValue'] = uniqueValueValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.display.valueChanges.subscribe((displayValue: any) => {
     
      this.filterValues['display'] = displayValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });

    this.active.valueChanges.subscribe((activeValue: any) => {
     
      this.filterValues['active'] = activeValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.compositKey.valueChanges.subscribe((compositKeyValue: any) => {
     
      this.filterValues['compositKey'] = compositKeyValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
    this.description.valueChanges.subscribe((descriptionValue: any) => {
     
      this.filterValues['description'] = descriptionValue;
      this.configurationList.filter = JSON.stringify(this.filterValues);
    });
  }
  filterConfiguration(){
    this.formSubscribe() ;
    this.configurationList.filterPredicate = (data: any, filter: string): any => {
      let searchString = JSON.parse(filter);
      if(data.columnAlias !== null && data.columnName !==null && data.columnOrder !==null && data.columnType !==null && data.foreignKeyColumn !==null  && data.foreignKeySchema !==null 
         && data.foreignKeyTable !==null && data.schemaName !==null && data.clientName !==null && data.tableName !==null && data.app !==null && data.ui !==null && data.uniqueValue && data.regularExpression && data.requiredField !==null && data.display !==null && data.active !==null && data.compositKey !==null&& data.description !==null){
      const resultValue =
        data.columnAlias
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.columnAlias.toLowerCase()) !== -1 &&
        data.columnType
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.columnType.toLowerCase()) !== -1 &&
                  data.columnOrder
                    .toString()
                    .trim()
                    .toLowerCase()
                    .indexOf(searchString.columnOrder.toLowerCase()) !== -1 &&
                    data.columnName
                    .toString()
                    .trim()
                    .toLowerCase()
                    .indexOf(searchString.columnName.toLowerCase()) !== -1 &&
                    data.tableName
                    .toString()
                    .trim()
                    .toLowerCase()
                    .indexOf(searchString.tableName.toLowerCase()) !== -1 &&
                    data.foreignKeyColumn
                    .toString()
                    .trim()
                    .toLowerCase()
                    .indexOf(searchString.foreignKeyColumn.toLowerCase()) !== -1 &&
                    data.foreignKeySchema
                    .toString()
                    .trim()
                    .toLowerCase()
                    .indexOf(searchString.foreignKeySchema.toLowerCase()) !== -1 &&
                    data.foreignKeyTable
                    .toString()
                    .trim()
                    .toLowerCase()
                    .indexOf(searchString.foreignKeyTable.toLowerCase()) !== -1 &&
                    data.schemaName
                    .toString()
                    .trim()
                    .toLowerCase()
                    .indexOf(searchString.schemaName.toLowerCase()) !== -1 &&
                    data.clientName
                    .toString()
                    .trim()
                    .toLowerCase()
                    .indexOf(searchString.clientName.toLowerCase()) !== -1 &&
                    data.app
                    .toString()
                    .trim()
                    .toLowerCase()
                    .indexOf(searchString.app.toLowerCase()) !== -1 &&
                    data.uniqueValue
                    .toString()
                    .trim()
                    .toLowerCase()
                    .indexOf(searchString.uniqueValue.toLowerCase()) !== -1 &&
                    data.regularExpression
                    .toString()
                    .trim()
                    .toLowerCase()
                    .indexOf(searchString.regularExpression.toLowerCase()) !== -1 &&
                    data.requiredField
                    .toString()
                    .trim()
                    .toLowerCase()
                    .indexOf(searchString.requiredField.toLowerCase()) !== -1 &&
                    data.ui
                    .toString()
                    .trim()
                    .toLowerCase()
                    .indexOf(searchString.ui.toLowerCase()) !== -1 &&
                    data.display
                    .toString()
                    .trim()
                    .toLowerCase()
                    .indexOf(searchString.display.toLowerCase()) !== -1 &&
                      data.active
                      .toString()
                      .trim()
                      .toLowerCase()
                      .indexOf(searchString.active.toLowerCase()) !== -1 &&
                      data.compositKey
                      .toString()
                      .trim()
                      .toLowerCase()
                      .indexOf(searchString.compositKey.toLowerCase()) !== -1 &&
                      data.description
                      .toString()
                      .trim()
                      .toLowerCase()
                      .indexOf(searchString.description.toLowerCase()) !== -1 
                                                        
      return resultValue;
        }
        return data;
    };
    this.configurationList.filter = JSON.stringify(this.filterValues);
  }
  selectConfiguration(event : any,configurationSettingId : any){
    if(event.target.checked == true){
      this.ischecked = true
     this.deleteItems .push(configurationSettingId);
      this.deleteFlag = true;
    }else{
      this.deleteFlag = false;
    }
  }

  checkAllConfigurations(event : any){
    this.deleteItems = [];
    if(event.target.checked == true){
    for (
      var i = 0;
      i < this.configurations.length && i < this.itemsPerPage;
      i++
    ) {
      this.configurations[i].isSelected = true;
      this.deleteItems .push(this.configurations[i].id.toString());
      this.deleteFlag = true;
      
    }
  }
  else{
    
    for (
      var i = 0;
      i < this.configurations.length && i < this.itemsPerPage;
      i++
    ) {
      this.configurations[i].isSelected = false;
      this.deleteFlag = false;
      event.target.checked = false;
    }
  }
  }
  deleteConfiguration(){

      this.columnConfigurationService.deleteAllConfigurations(this.deleteItems).subscribe((res: HttpResponse<any>) => {
        const data = res.body || [];
        this.loadPage(1);
        this.deleteFlag = false;
        
         });
    
  }

  selectAppName(){
    let appName = this.editForm.get(["app"])!.value;
    this.columnConfigurationService.getUiListByAppName(appName).subscribe((res : HttpResponse<any[]>) => {debugger;
      const data = res.body|| [];
      this.uiList = data;
    
    });
      }
  getDataByClientNameAndAppAndUi(){debugger;
   const ui= this.editForm.get(["ui"])!.value;
   const clientName= this.editForm.get(["clientName"])!.value;
   const appName= this.editForm.get(["app"])!.value;
   this.columnConfigurationService.findDataByClientNameAndAppNameAndUi(clientName,appName,ui).subscribe((res: HttpResponse<any>) => {
    const data = res.body || [];
    this.configurations = data.finalData || [];
      this.configurationList.data = this.configurations;
      this.configurationList.sort = this.sort1;
      this.totalItems = data.recordCount;
     });
  }

  create(){debugger;
    // this.router.navigate(['/column_management',this.appName,this.clientNam,this.tableNam,'new']);
    this.router.navigate(['/column_management','new']);
  }
  edit(id:any){debugger;
    this.router.navigate(['/column_management',this.appName,this.clientNam,this.tableNam,id,'edit']);
  }
  
  view(id: any){debugger;
   // this.viewEvent.emit(id);
   this.router.navigate(['/column_management',this.appName,this.clientNam,this.tableNam,id,'view']);
  }
}
