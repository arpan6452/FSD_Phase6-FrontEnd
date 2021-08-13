import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class cartItemClass{
  itemName: string;
  itemPrice: number;

  getItems(){
    return "Hello";
  }
}
