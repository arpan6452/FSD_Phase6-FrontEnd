import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ItemCartListService } from '../common/item-cart-list.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItemList: any;
  billedList: any[]= [];
  itemIdList: string="";
  totalPrice: number = 0;
  gst: number = 0;
  sgst: number = 0;
  totalPriceWithTax: number = 0;
  cartForm: any;
  fullAddress: string = "";
  showModal: boolean = true;


  constructor(private fb: FormBuilder, private itemCartListService: ItemCartListService) {
    this.cartForm = this.fb.group({
      username: ['',Validators.required],
      email: ['',Validators.required],
      address1: ['',Validators.required],
      address2: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      pincode: ['',Validators.required],
      cname: ['',Validators.required],
      ccnum: ['',Validators.required],
      expmonth: ['',Validators.required],
      expyear: ['',Validators.required],
      cvv: ['',Validators.required],
    });
    let cartItemLocalStorage = localStorage.getItem('cartItems');
    this.cartItemList = JSON.parse(cartItemLocalStorage);

    for(let cartItem of this.cartItemList){
      cartItem['cartPrice'] = parseInt(cartItem.price) * parseInt(cartItem.quantity);
      this.billedList.push(cartItem);
      this.totalPrice = this.totalPrice + cartItem.cartPrice;

    }

    this.gst = .18 * this.totalPrice;
    this.sgst = .17 * this.totalPrice;

    this.totalPriceWithTax = this.totalPrice + this.gst + this.sgst;

  }

  ngOnInit(): void {

  }

  confirmOrder(){
    if(this.cartForm.valid){
      this.fullAddress = this.cartForm.get("address1").value + " , " + this.cartForm.get("address2").value + " , " +
                        this.cartForm.get("city").value + " , " + this.cartForm.get("state").value + " , Pincode: " +
                        this.cartForm.get("pincode").value;
    }else{
      this.validateForm(this.cartForm);
    }
  }

  private validateForm(form:any) {
    Object.keys(form.controls).forEach(field=>{
     const control =  form.get(field);
     if(control instanceof FormControl){
      control.markAsTouched({ onlySelf : true});
     } else{
      this.validateForm(control);
     }
    });
  }

  public hasError(field:any){
    return ( this.cartForm.get(field)?.invalid && this.cartForm.get(field)?.touched &&
    this.cartForm.get(field)?.errors);
  }

  get f(){ return this.cartForm.controls;}

}
