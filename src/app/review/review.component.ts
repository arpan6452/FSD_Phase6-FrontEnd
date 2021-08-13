import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ItemCartListService } from '../common/item-cart-list.service';
import { UserServiceService } from '../common/user-service.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  cartItemLists: any;
  itemIdList: string="";
  billedList: any[]= [];
  items: any = [];
  totalPrice: number=0;
  isDisabled: boolean = true;
  cartItems: any= [];
  data: any;

  constructor(private itemCartListService: ItemCartListService, private router: Router,
    private userServiceService: UserServiceService, private httpClient: HttpClient,
    private sanitizer: DomSanitizer) { }

  // ngOnInit(): void {
  //   let cartItemLocalStorage = localStorage.getItem('cartItems');
  //   this.cartItemLists = JSON.parse(cartItemLocalStorage);
  //   this.cartItems = this.cartItemLists;
  //   //this.cartItemLists = this.itemCartListService.getItemCartList();
  //   for(let cartItem of this.cartItemLists){
  //     if(!(this.itemIdList.includes(cartItem.itemid))){
  //       this.billedList.push(cartItem);
  //       this.itemIdList = this.itemIdList + ";" + cartItem.itemid;
  //     }else{
  //       cartItem.price = cartItem.price + cartItem.price;
  //     }
  //   }
  // }

  // addQuantity(quantity, price, item){
  //   let priceInt = parseInt(price.innerText);
  //   let updatedQuantity: number = parseInt(quantity.innerText) + 1;
  //   quantity.innerText = updatedQuantity.toString();
  //   this.totalPrice = this.totalPrice + priceInt;

  //   this.cartItems.push(item);

  //   if(this.totalPrice > 0 && this.userServiceService.getAuthentication()){
  //     this.isDisabled = false;
  //   }else{
  //     this.isDisabled = true;
  //   }
  // }

  // deductQuantity(quantity, price, item){
  //   let priceInt = parseInt(price.innerText);
  //   let currentValue = parseInt(quantity.innerText) - 1;
  //   if(currentValue >= 0){
  //     let updatedQuantity: number = parseInt(quantity.innerText) - 1;
  //     quantity.innerText = updatedQuantity.toString();
  //     this.totalPrice = this.totalPrice - priceInt;
  //     const index = this.cartItems.indexOf(item);
  //     if (index > -1) {
  //       this.cartItems.splice(index, 1);
  //     }
  //   }
  //   if(this.totalPrice > 0 && this.userServiceService.getAuthentication()){
  //     this.isDisabled = false;
  //   }else{
  //     this.isDisabled = true;
  //   }
  // }

  // gotToCart(){
  //   //this.itemCartListService.addItemCartList(this.cartItems);
  //   localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  //   this.router.navigateByUrl("/cartPage");
  // }
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  ngOnInit(): void {
  }

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      });
  }
    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:6003/items')
      .subscribe(
        res => {
          this.retrieveResonse = res;
          for(let image of this.retrieveResonse){
            this.base64Data = image.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            //this.retrievedImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            // console.log(this.retrievedImage);
          }

        }
      );
  }
}

