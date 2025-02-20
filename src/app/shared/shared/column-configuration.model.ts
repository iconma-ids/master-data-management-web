import { BlobOptions } from "buffer";

export interface IColumnConfiguration {
    id?:number;
    //clientName?:string;
    columnName?:string;
    //columnType?:string;
    schemaName?:string;
    tableName?:string;
    columnDisplayName?:string;
    tableDisplayName?:string;
    dataType?:string;
    primaryName?:string;
    size?:string;
    precision?:string;
    validValueList?:string;
    minValue?:string;
    maxValue?:string;
    tableEditable?:boolean;
    columnEditable?:boolean;
    defaultValue?:boolean;
    // display?:boolean;
    systemTableFlag?:boolean;
    customTableFlag?:boolean;
    uiEnable?:boolean;
    allowNullFlag?:boolean;

    
    
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

    //public clientName?:string,
    public columnName?:string,
    //public columnType?:string,
    public schemaName?:string,
    public tableName?:string,
    public displayName?:string,
    public dataType?:string,
    public primaryName?:string,
    public size?:string,
    public precision?:string,
    public validValueList?:string,
    public minValue?:string,
    public maxValue?:string,
    public tableEditable?:boolean,
    public columnEditable?:boolean,
    public defaultValue?:boolean,
    public systemTableFlag?:boolean,
    public customTableFlag?:boolean,
    public uiEnable?:boolean,
    public allowNullFlag?:boolean


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