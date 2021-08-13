import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public baseURL = 'http://localhost:6003';
  private token: string;
  private authorization: string;
  private isAuthenticated = false;
  private username = null;
  private customTimer: any;
  private authSatatusListener = new Subject<boolean>();


  public getToken(): string{
      return this.token;
  }

  public getAuthentication(): boolean{
    return this.isAuthenticated;
  }

  public getAuthorization(): string{
    return this.authorization;
  }

  public getUsername(): string{
    return this.username;
}

  public clearAuthorization(): string{
    this.authorization = null;
    return this.authorization;
  }

  public getAuthStatusListener(){
    return this.authSatatusListener.asObservable();
  }

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : this.baseURL , 'Access-Control-Allow-Credentials': 'true' }),
   };

  constructor(private http: HttpClient) { }

  createUser(user){
    const userForm = {
      roleName: user.get("role").value,
      username: user.get("email").value,
      password: user.get("password").value,
      address1: user.get("address1").value,
      address2: user.get("address2").value,
      city: user.get("city").value,
      state: user.get("state").value,
      pincode: user.get("pincode").value,
    };
    return this.http.request('POST', `${this.baseURL}/api/auth/registration`, {
      body: userForm,
    }).pipe(

    );
  }


  updatePassword(updatePasswordForm){
    const userForm = {
      oldpassword: updatePasswordForm.controls['oldpassword'].value,
      newpassword: updatePasswordForm.controls['newpassword'].value,
      username: this.username
    };
    return this.http.request('PUT', `${this.baseURL}/api/auth/updatePassword`, {
      body: userForm,
    }).pipe(

    );
  }

  login(user): any{
    const userForm = {
      username: user.controls['emailId'].value,
      password: user.controls["password"].value,
    };
    return this.http.request('POST', `${this.baseURL}/api/auth/login`, {
      body: userForm,
    })
    .pipe(
      map((data: { key: string,username:string, role:string, expiresIn: any }) => {
        this.token = data["key"];
        if (this.token) {
          this.isAuthenticated = true;
          this.authorization = data["role"];
          this.username = data["username"];
          this.saveAuthData(this.token, this.authorization, this.username);
          return this.isAuthenticated;

        }else{
          this.isAuthenticated = false;
          return this.isAuthenticated;
        }
      })
    );
  }

  clearToken(){
    this.token = null;
    this.isAuthenticated = false;
    this.authorization = null;
    this.username = null;
    clearTimeout(this.customTimer);
    this.clearAuthData();
  }

  autoAuthUser(): void {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
      this.token = authInformation.token;
      this.authorization = authInformation.authorization;
      this.username = authInformation.username;
      this.isAuthenticated = true;

  }

  private saveAuthData(token: string, role:string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('authorization', role);
    localStorage.setItem('username', username);
  }
  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('authorization');
    localStorage.removeItem('username');
  }

  private getAuthData(): any {
    const token = localStorage.getItem('token');
    const authorization = localStorage.getItem('authorization');
    const username = localStorage.getItem('username');
    if (!token) {
      return;
    }
    return {
      token,
      authorization,
      username
    };
  }
}
