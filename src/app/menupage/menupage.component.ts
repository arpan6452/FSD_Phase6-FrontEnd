import { ItemCartListService } from './../common/item-cart-list.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemServiceService } from '../common/item-service.service';
import { UserServiceService } from '../common/user-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.css']
})
export class MenupageComponent implements OnInit {

  items: any = [];
  data: any = [];
  filterMedicineName: any = [];
  filterBrandName: any = [];
  totalPrice: number=0;
  searchForm: any;
  cartItems: any= [];
  isSearchBttnDisabled: boolean = true;
  isDisabled: boolean = true;
  isLoading: boolean = false;

  constructor(private itemService: ItemServiceService, private formBuilder: FormBuilder, private router: Router,
    public _DomSanitizationService: DomSanitizer,
    private userServiceService: UserServiceService) {
    this.searchForm = this.formBuilder.group({
      medicineBrand: [''],
      medicineName: [''],
    })
   }

  ngOnInit(): void {
      this.viewAllMenu();
  }

  filterMenu(): void{
    if(this.searchForm.valid){
      this.itemService.searchItems(this.searchForm).subscribe(res =>{
        // this.isLoading = true;
        this.data = res;
        if(this.data.length==0){
          this.itemService.getAllItems().subscribe(res =>{
            // this.setFilterData(res);
          })
          this.items = this.data;
          // this.isLoading = false;
        }else{
          this.setFilterData(res);
          this.items = this.data;
          // this.isLoading = false;
        }
      })
      this.totalPrice = 0;
    }else{
      this.isSearchBttnDisabled = true;
      // this.isLoading = false;
    }

  }

  updateTotalPrice(){
    for(let item of this.items){
      this.totalPrice = this.totalPrice + item.price;
    }
  }

  viewAllMenu(){
    this.itemService.getAllItems().subscribe(res =>{
      // this.isLoading = true;
      this.items = res;
      this.setFilterData(res);
      // this.isLoading = false;
    })
  }

  addQuantity(quantity, price, item){
    let priceInt = parseInt(price.innerText);
    let updatedQuantity: number = parseInt(quantity.innerText) + 1;
    quantity.innerText = updatedQuantity.toString();
    this.totalPrice = this.totalPrice + priceInt;
    let isPresent: boolean = false;
    for(let savedItem of this.cartItems){
      if(savedItem.itemid == item.itemid){
        item["quantity"] = updatedQuantity.toString() ;
        isPresent = true;
      }
    }
    if(!isPresent){
      item["quantity"] = 1;
      this.cartItems.push(item);
    }

    if(this.totalPrice > 0 && this.userServiceService.getAuthentication()){
      this.isDisabled = false;
    }else{
      this.isDisabled = true;
    }
  }

  deductQuantity(quantity, price, item){
    let priceInt = parseInt(price.innerText);
    let currentValue = parseInt(quantity.innerText) - 1;
    if(currentValue >= 0){
      let updatedQuantity: number = parseInt(quantity.innerText) - 1;
      quantity.innerText = updatedQuantity.toString();
      this.totalPrice = this.totalPrice - priceInt;
      const index = this.cartItems.indexOf(item);
        if (index > -1) {
          this.cartItems.splice(index, 1);
        }

    }
    if(this.totalPrice > 0 && this.userServiceService.getAuthentication()){
      this.isDisabled = false;
    }else{
      this.isDisabled = true;
    }
  }

  gotToCart(){
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.router.navigateByUrl("/cartPage");
  }

  hasError(field: any){
    return (this.searchForm.get(field)?.invalid && this.searchForm.get(field)?.touched && this.searchForm.get(field)?.errors);
  }

  get f(){ return this.searchForm.controls;}

  setFilterData(res){
    this.filterMedicineName = [];
    this.filterBrandName = [];
    let medicineName = "";
    let medicineBrand = "";
    for(let item of res){
      if(!medicineBrand.includes(item.medicineBrand)){
        this.filterBrandName.push(item);
        medicineBrand = medicineBrand + ";" + item.medicineBrand
      }
      if(!medicineName.includes(item.medicineName)){
        this.filterMedicineName.push(item);
        medicineName = medicineName + ";" + item.medicineName
      }
    }
  }
}



