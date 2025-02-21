import { BlobOptions } from "buffer";

export interface IColumnConfiguration {
     id?:number;
     clientName?:string;
     schemaName?:string;
     app?:string;
     tableName?:string;
     tableDisplayName?:string;
     tableEditable?:boolean;
     customTableFlag?:boolean;
     systemTableFlag?:boolean;
     uiEnable?:boolean;
     columnName?:string;
     columnDisplayName?:string;
     primaryKey?:boolean;
     minValue?:string;
     maxValue?:string;
     dataType?:string;
     size?:string;
     precision?:string;
     validValueList?:string;
     allowNullFlag?:boolean;
     defaultValue?:boolean;
     columnEditable?:boolean;

    
    
    // columnOrder?:number;
    // columnName?:string;
    // columnAlias?:string;
    // columnType?:string;
    // clientName?:string;
    // schemaName?:string;
    // foreignKeySchema?:string;
    // foreignKeyTable?:string;
    // foreignKeyColumn?:string;
    // foreignKeyValue?:string;
    // app?:string;
    // ui?:string;
    // regularExpression?:string;
    // requiredField?:boolean;
    // display?:boolean;
    // uniqueValue?:boolean;
    // active?:boolean;
    // tableName?:string;
    // compositKey?:boolean;
    // description?:string;
    // condition?:string;
}

export class ColumnConfiguration implements IColumnConfiguration {

    constructor(
    public id?:number,
    public clientName?:string,
    public schemaName?:string,
    public app?:string,
    public tableName?:string,
    public tableDisplayName?:string,
    public tableEditable?:boolean,
    public customTableFlag?:boolean,
    public systemTableFlag?:boolean,
    public uiEnable?:boolean,
    public columnName?:string,
    public columnDisplayName?:string,
    public primaryKey?:boolean,
    public minValue?:string,
    public maxValue?:string,
    public dataType?:string,
    public size?:string,
    public precision?:string,
    public validValueList?:string,
    public allowNullFlag?:boolean,
    public defaultValue?:boolean,
    public columnEditable?:boolean,


   // public columnOrder?:number,
    // public clientName?:string,
    // public columnName?:string,
    // public columnType?:string,
    // public columnSchema?:string,
    // public foreignKeySchema?:string,
    // public foreignKeyTable?:string,
    // public foreignKeyColumn?:string,
    // public foreignKeyValue?:string,
    // public app?:string,
    // public ui?:string,
    // public regularExpression?:string,
    // public requiredField?:boolean,
    // public uniqueValue?:boolean,
    // public display?:boolean,
    // public active?:boolean,
    // public tableName?:string,
    // public compositKey?:boolean,
    // public description?:string,
    // public condition?:string,
     ) {
       
    }
}