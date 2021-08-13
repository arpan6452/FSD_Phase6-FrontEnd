import { UserServiceService } from './../common/user-service.service';
// import { UserDataService } from './../common/user-data.service';
import { ItemServiceService } from './../common/item-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  passwordResponse: any;
  items: any = [];
  createItemForm: any;
  updateItemForm: any;
  updatePasswordForm: any;
  userDetails: any;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  errorPassword = "";

  constructor( private userService: UserServiceService, private fb: FormBuilder, private itemService: ItemServiceService, private router: Router
    ,public _DomSanitizationService: DomSanitizer) {
      this.createItemForm = this.fb.group({
        medicineName: ['', Validators.required],
        medicineBrand: ['', Validators.required],
        medicineQuantity: ['', Validators.required],
        price: ['', Validators.required]
      })
      this.updateItemForm = this.fb.group({
        itemid: ['', Validators.required],
        medicineName: ['', Validators.required],
        medicineBrand: ['', Validators.required],
        medicineQuantity: ['', Validators.required],
        price: ['', Validators.required]
      })

      this.updatePasswordForm = this.fb.group({
        oldpassword: ['', Validators.required],
        newpassword: ['', Validators.required]
      })

      //this.userDetails = this.userService.getAuthentication();
      // this.userDetail = this.userDetails[0];
   }

  ngOnInit(): void {
    this.getAllElements();
  }

  updatePassword(){
    this.userService.updatePassword(this.updatePasswordForm).subscribe( res => {
      console.log(res);
      this.passwordResponse = res;
      // if(this.passwordResponse)
      //   this.router.navigateByUrl("/adminPage");
      // else
        this.errorPassword = this.passwordResponse.msg;
    }, error => {
      console.log(error);
    });
  }

  openForm(item){
    this.updateItemForm.controls['itemid'].setValue(item.itemid);
    const byteCharacters = atob(item.picByte);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const myBlob = new Blob([byteArray], {type: 'contentType'});
    this.selectedFile = this.blobToFile(myBlob,'FileName.png');

    //this.selectedFile = item.picByte;
    this.updateItemForm.controls['medicineName'].setValue(item.medicineName);
    this.updateItemForm.controls['medicineBrand'].setValue(item.medicineBrand);
    this.updateItemForm.controls['medicineQuantity'].setValue(item.medicineQuantity);
    this.updateItemForm.controls['price'].setValue(item.price);
  }

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  createItemSubmit(){
    this.itemService.createItem(this.createItemForm, this.selectedFile).subscribe( res => {

      this.getAllElements();
      this.createItemForm.reset();
    }, error => {
      console.log(error);
    });
  }

  updateItemSubmit(close){
    close.click();
    this.itemService.updateItem(this.updateItemForm.get("itemid").value, this.updateItemForm, this.selectedFile).subscribe( res => {
      this.getAllElements();
      // this.createItemForm.reset();
    }, error => {
      console.log(error);
    });
  }

  deleteItem(item){
    this.itemService.deleteItems(item.itemid).subscribe( data =>{
      this.getAllElements();
    }, error =>{
      //console.log(error);
    })
  }

  getAllElements(){
    this.itemService.getAllItems().subscribe(res =>{
      this.items = res;
    });
  }

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
}

}
