import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
 // private currentPage: number = 1;
  private readonly PageNumber = 'currentPage';
  //private totalItems:number = 0;
  private readonly totalData = 'totalItems';

  setPage(page: number): void {
    sessionStorage.setItem(this.PageNumber, page.toString());
    //this.currentPage = page;
  }

  getPage(): number {
    const storedPage = sessionStorage.getItem(this.PageNumber);
    //return this.currentPage;
    return storedPage ? +storedPage : 1;
  }

  setTotalCount(totalCount:number):void{
    sessionStorage.setItem(this.totalData, totalCount.toString());
    //this.totalItems = totalCount;
  }

  getTotalcount():number{
    const storedPage = sessionStorage.getItem(this.totalData);
   // return this.totalItems;
   return storedPage ? +storedPage : 1;
  }
}
