import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemCartListService {
  itemCartList: any = [];
  constructor() { }

  addItemCartList(itemCartListData){
    this.itemCartList = itemCartListData;
  }

  getItemCartList(){
    return this.itemCartList;
  }
}
