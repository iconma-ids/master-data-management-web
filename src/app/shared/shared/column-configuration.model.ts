export interface IColumnConfiguration {
    id?:number;
    columnOrder?:number;
    columnName?:string;
    columnAlias?:string;
    columnType?:string;
    clientName?:string;
    schemaName?:string;
    foreignKeySchema?:string;
    foreignKeyTable?:string;
    foreignKeyColumn?:string;
    foreignKeyValue?:string;
    app?:string;
    ui?:string;
    regularExpression?:string;
    requiredField?:boolean;
    display?:boolean;
    uniqueValue?:boolean;
    active?:boolean;
    tableName?:string;
    compositKey?:boolean;
    description?:string;
    condition?:string;
}

export class ColumnConfiguration implements IColumnConfiguration {

    constructor(
    public id?:number,
    public columnOrder?:number,
    public clientName?:string,
    public columnName?:string,
    public columnType?:string,
    public columnSchema?:string,
    public foreignKeySchema?:string,
    public foreignKeyTable?:string,
    public foreignKeyColumn?:string,
    public foreignKeyValue?:string,
    public app?:string,
    public ui?:string,
    public regularExpression?:string,
    public requiredField?:boolean,
    public uniqueValue?:boolean,
    public display?:boolean,
    public active?:boolean,
    public tableName?:string,
    public compositKey?:boolean,
    public description?:string,
    public condition?:string,
     ) {
       
    }
}