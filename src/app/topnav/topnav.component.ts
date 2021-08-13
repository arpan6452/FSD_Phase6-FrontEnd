import { UserServiceService } from './../common/user-service.service';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
// import { UserDataService } from '../common/user-data.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  @ViewChild('closeSignInModal') closeSignInModal: ElementRef;
  @ViewChild('closeSignUpModal') closeSignUpModal: ElementRef;

  public user:User = {emailId: '', password: ''};
  submitted: boolean = false;
  signUpForm: any;
  isUserPrsent: boolean;
  isAdmin: string;
  username: string;
  isCorrectCredentials: boolean = false;
  registerMsg: any = "";

  constructor( private formBuilder: FormBuilder, private userService: UserServiceService, private router: Router) {
    this.signUpForm = this.formBuilder.group({
      role: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    try{
      this.isUserPrsent = this.userService.getAuthentication(); //this.userDataService.getUserDetails();
      this.isAdmin = this.userService.getAuthorization();
      this.username = this.userService.getUsername();
    }catch(error){
      this.isUserPrsent = false;
    }
    console.log(this.isUserPrsent);

  }

  /****Login*****/
  signIn(signInForm: any){
    if(signInForm.valid){
      this.userService.login(signInForm).subscribe( res =>{
        console.log(res);
        this.isUserPrsent = res;
        this.isAdmin = this.userService.getAuthorization();
        this.username = this.userService.getUsername();
        this.submitted = true;
        this.closeSignInModal.nativeElement.click();
        //this.userDataService.setUserDetails(res);
        this.router.navigateByUrl("/menuPage");
      }, error => {
        this.isCorrectCredentials = true;
        console.log(error);
        this.submitted = false;
      });
    }else{
      this.submitted = false;
      this.validateForm(signInForm);
    }
  }

  private validateForm(form:any) {
    Object.keys(form.controls).forEach(field=>{
     const control =  form.controls[field];
     control.markAsTouched({ onlySelft : true});
    });
  }

  public hasError(field:any) {
    return (field.invalid && field.touched && field.errors);
  }
  /****Login*****/

  /****Registration*****/
  register(){
    if(this.signUpForm.valid){
      this.userService.createUser(this.signUpForm).subscribe( res =>{
        //console.log(res);
        this.registerMsg = res;
        //this.isUserPrsent = res;
        //this.userDataService.setUserDetails(res);
        //this.closeSignUpModal.nativeElement.click();
        //this.router.navigateByUrl("/menuPage");
    }, error => {
      console.log(error);
    });
    }else{
      this.submitted = false;
      this.validateRegistrationForm(this.signUpForm);
    }
  }

  private validateRegistrationForm(form:any) {
    Object.keys(form.controls).forEach(field=>{
     const control =  form.get(field);
     if(control instanceof FormControl){
      control.markAsTouched({ onlySelf : true});
     } else{
      this.validateRegistrationForm(control);
     }
    });
  }

  public hasErrorRegistration(field:any){
    return ( this.signUpForm.get(field)?.invalid && this.signUpForm.get(field)?.touched &&
    this.signUpForm.get(field)?.errors);
  }

  get f_Registration(){ return this.signUpForm.controls;}
  /****Registration*****/

  logout(){
    //this.userDataService.clearUserDetails();
    this.isUserPrsent = false;
    this.isAdmin = this.userService.clearAuthorization();
    this.username = null;
    this.userService.clearToken();
    this.router.navigateByUrl("/menuPage")
  }

}

interface User{
  emailId: string;
  password: string;
}
