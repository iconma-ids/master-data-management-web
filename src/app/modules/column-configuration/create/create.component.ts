import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ColumnConfigurationService } from '../column-configuration.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { IColumnConfiguration, ColumnConfiguration } from '../../../shared/shared/column-configuration.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: false,
})
export class CreateComponent implements OnInit {
  selected:any;
  selectedUnique:any;
  dropdownList: any = [];
  selectedItems = [];
  dropdownSettings = {};
  update: boolean = false;
  schamaNameList : any[] = [];
  clientNameList : any[] = [];
  tableNameList : any[] = [];
  foreignKeyTableNameList : any[] = [];
  columnNameList : any[] = [];
  foreignKeyColumnNameList : any[] = [];
  foreignKeyValuesList : any[] = [];
  applicationList : any[] = [];
  newColumnFlag: boolean = false;
  updateNewColumnFlag: boolean = true;
  dataTypeList : any[] = [];
  schema : any;
  foreignSchema : any;
  lookupFlag: boolean = false;
  dependentFlag: boolean = false;
  conditionFlag: boolean = false;
  formdata: FormData = new FormData();
  editForm: any;


  
 

  constructor(
    private fb: FormBuilder,
    private columnConfigurationService: ColumnConfigurationService,
    protected activatedRoute: ActivatedRoute,

  ) {


    this.editForm = this.fb.group({
    id: [],
    columnOrder: [null],
    app: [null],
    ui: [null],
    columnName: [null],
    tableName: [null],
    clientName: [null],
    regularExpression: [null],
    requiredField: [null],
    columnType: [null],
    foreignKeyTable: [null],
    foreignKeySchema: [null],
    foreignKeyColumn: [null],
    foreignKeyValue: [null],
    requiredValue: [null],
    schemaName: [null],
    uniqueValue: [null],
    display: [null],
    columnAlias:[null],
    active: [null],
    compositKey : [null],
    newColumnName : [null],
    description : [null],
    condition : [null],
  });
  }

  ngOnInit(): void {
    this.selectedUnique = null;
    this.columnConfigurationService.getSchemaNameList().subscribe((res : HttpResponse<any>) => {debugger;
      const data = res.body
     this.schamaNameList = data;
    });
    this.columnConfigurationService.getApplicationList().subscribe((res : HttpResponse<any>) => {debugger;
      const data = res.body
     this.applicationList = data;
    });
    this.columnConfigurationService.getDataTypeList().subscribe((res : HttpResponse<any>) => {debugger;
      const data = res.body
     this.dataTypeList = data;
    });
    this.columnConfigurationService.getClientNameList().subscribe((res : HttpResponse<any>) => {debugger;
      const data = res.body
     this.clientNameList = data;
    });
   

    this.activatedRoute.data.subscribe(({ columnConfiguration }) => {
      this.updateForm(columnConfiguration);
    });
 
  }

  save(): void {debugger;
    const columnConfiguration = this.createFromForm();
    if (columnConfiguration.id !== undefined && columnConfiguration.id !== null) {
      this.update = false;
      this.columnConfigurationService.update(columnConfiguration).subscribe((res : HttpResponse<any>) => {debugger;
        const data = res.body
       console.log(data.message);
       if(data.message !== "success"){
        alert(data.message);
       }
       else{
        this.previousState();
       }
      });
    } else {
      delete columnConfiguration.id;
      this.columnConfigurationService.create(columnConfiguration).subscribe((res : HttpResponse<any>) => {debugger;
        const data = res.body
       console.log(data.message);
       if(data.message !== "success"){
      alert(data.message);
       }
       else{
        this.previousState();
       }
       
      });
    }
  }

  previousState(): void {
    window.history.back();
  }

  private createFromForm(): IColumnConfiguration {
    return {
      ...new ColumnConfiguration(),
      id: this.editForm.get(["id"])!.value,
      columnAlias: this.editForm.get(["columnAlias"])!.value,
      app: this.editForm.get(["app"])!.value,
      ui: this.editForm.get(["ui"])!.value,
      regularExpression: this.editForm.get(["regularExpression"])!.value,
      columnOrder: this.editForm.get(["columnOrder"])!.value,
      columnType: this.editForm.get(["columnType"])!.value,
      columnName: this.editForm.get(["columnName"])!.value,
      tableName: this.editForm.get(["tableName"])!.value,
      foreignKeyColumn: this.editForm.get(["foreignKeyColumn"])!.value,
      foreignKeySchema: this.editForm.get(["foreignKeySchema"])!.value,
      foreignKeyTable: this.editForm.get(["foreignKeyTable"])!.value,
      foreignKeyValue: this.editForm.get(["foreignKeyValue"])!.value,
      clientName: this.editForm.get(["clientName"])!.value,
      schemaName: this.editForm.get(["schemaName"])!.value,
      active: this.editForm.get(["active"])!.value == "Yes" ? true : false,
      display: this.editForm.get(["display"])!.value == "Yes" ? true : false,
      requiredField: this.editForm.get(["requiredField"])!.value == "Yes" ? true : false,
      uniqueValue: this.editForm.get(["uniqueValue"])!.value == "Yes" ? true : false,
      compositKey: this.editForm.get(["compositKey"])!.value == "Yes" ? true : false,
      description: this.editForm.get(["description"])!.value,
      condition: this.editForm.get(["condition"])!.value,
    };
  }

  updateForm(columnConfiguration: any): void {debugger;
    this.selected =  columnConfiguration.columnAlias;
    if(columnConfiguration.columnType == "LookUp"){
      this.lookupFlag = true;
      if(columnConfiguration.foreignKeyValue != null){
        this.conditionFlag = true;
      }
    }
    else if(columnConfiguration.columnType == "Dependent"){
      this.dependentFlag = true;
    }
    
    this.selectedUnique = columnConfiguration.uniqueValue;
    this.editForm.patchValue({
      id: columnConfiguration.id,
      app: columnConfiguration.app,
      columnAlias: columnConfiguration.columnAlias,
      columnName: columnConfiguration.columnName,
      columnOrder: columnConfiguration.columnOrder,
      columnType: columnConfiguration.columnType,
      foreignKeyColumn: columnConfiguration.foreignKeyColumn,
      foreignKeySchema: columnConfiguration.foreignKeySchema,
      foreignKeyTable: columnConfiguration.foreignKeyTable,
      clientName: columnConfiguration.clientName,
      uniqueValue: columnConfiguration.uniqueValue,
      requiredField: columnConfiguration.requiredField,
      display: columnConfiguration.display,
      regularExpression:columnConfiguration.regularExpression,
      schemaName:columnConfiguration.schemaName,
      tableName:columnConfiguration.tableName,
      ui:columnConfiguration.ui,
      active:columnConfiguration.active,
      compositKey:columnConfiguration.compositKey,
      description:columnConfiguration.description,
      foreignKeyValue: columnConfiguration.foreignKeyValue,
      condition: columnConfiguration.condition,
    });
    this.update = true;
    if(columnConfiguration.columnName === "code"){
    this.updateNewColumnFlag =false;
    }
    else{
      this.updateNewColumnFlag =true;
    }
    this. selectSchemaName();
    this. selectForeignKeySchemaName();
    this.selectTableName();
    this.selectForeignKeyTableName();
    this. selectForeignKeyColumnName();
  }

  selectSchemaName(){debugger;
   this.schema = this.editForm.get(["schemaName"])!.value;
  this.columnConfigurationService.getTableNamesBySchema(this.schema).subscribe((res : HttpResponse<any[]>) => {debugger;
    const data = res.body|| [];
    this.tableNameList = data;
  
  });
  }
  selectForeignKeySchemaName(){debugger;
  this.foreignSchema = this.editForm.get(["foreignKeySchema"])!.value;
  this.columnConfigurationService.getTableNamesBySchema(this.foreignSchema).subscribe((res : HttpResponse<any[]>) => {debugger;
    const data = res.body|| [];
    this.foreignKeyTableNameList = data;
  
  });
  }

  selectTableName(){
let table = this.editForm.get(["tableName"])!.value;
this.columnConfigurationService.getColumnNamesByTable(this.schema,table).subscribe((res : HttpResponse<any[]>) => {debugger;
  const data = res.body|| [];
  this.columnNameList = data;

});
  }

  selectForeignKeyTableName(){
let foreignTable = this.editForm.get(["foreignKeyTable"])!.value;
this.columnConfigurationService.getColumnNamesByTable(this.foreignSchema,foreignTable).subscribe((res : HttpResponse<any[]>) => {debugger;
  const data = res.body|| [];
  this.foreignKeyColumnNameList = data;

});
  }
  selectForeignKeyColumnName(){debugger;
    let foreignTable = this.editForm.get(["foreignKeyTable"])!.value;
    let foreignColumn = this.editForm.get(["foreignKeyColumn"])!.value;
    this.columnConfigurationService.getValuesByColumn(this.foreignSchema,foreignTable,foreignColumn).subscribe((res : HttpResponse<any[]>) => {debugger;
      const data = res.body|| [];
      this.foreignKeyValuesList = data;
    
    });
      }
  selectColumn(){debugger;
   
    if(this.editForm.get(["columnName"])!.value === "New Column Name"){
      this.newColumnFlag = true;
      this.selected = this.editForm.get(["columnName"])!.value;
    this.selected = this.selected.replace(/[_-]/, " ");
   this.selected=this.selected.replace(/\b\w/g, (first: string) => first.toLocaleUpperCase()) 
    }

    this.selected = this.editForm.get(["columnName"])!.value;
    this.selected = this.selected.replace(/[_-]/, " ");
   // this.selected=this.selected.substring(0,1).toUpperCase() + this.selected.substring(1).toLowerCase();
   this.selected=this.selected.replace(/\b\w/g, (first: string) => first.toLocaleUpperCase()) 
  }
  onChange(event : any) {
    const value = event.target.value;
    this.selected = value;
    this.selected = this.selected.replace(/[_-]/, " ");
    this.selected=this.selected.replace(/\b\w/g, (first: string) => first.toLocaleUpperCase()) 
  }
  selectRequiredTrue(){
    if(this.editForm.get(["requiredField"])!.value === "Yes"){
      this.selectedUnique = "Yes";
    }
    else{
      this.selectedUnique = "null";
    }
  }
  selectDataType(){debugger;
let dataType = this.editForm.get(["columnType"])!.value;
if(dataType == "LookUp"){
this.lookupFlag = true;
this.dependentFlag = false;
}
else if(dataType == "Dependent"){
  this.dependentFlag = true;
  this.lookupFlag = false;
}
else{
  this.lookupFlag = false;
  this.dependentFlag = false;
}
  }

  selectCondition(event:any){
if(event.target.checked == true){
  this.conditionFlag = true;
}  else{
  this.conditionFlag = false;
}
}
  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IColumnConfiguration>>
  ): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    // this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    // this.isSaving = false;
  }
  
}
