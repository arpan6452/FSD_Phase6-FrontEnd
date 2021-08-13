import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {
  public baseURL = 'http://localhost:6003';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : this.baseURL , 'Access-Control-Allow-Credentials': 'true' }),
  };

  constructor(private http: HttpClient) { }

  // createItem(itemDetails, image){
  //   const itemForm = {
  //     picByte: image,
  //     medicineName: itemDetails.get("medicineName").value,
  //     medicineBrand: itemDetails.get("medicineBrand").value,
  //     medicineQuantity: itemDetails.get("medicineQuantity").value,
  //     price: itemDetails.get("price").value,
  //   };
  //   return this.http.request('POST', `${this.baseURL}/upload`, {
  //     body: itemForm,
  //   }).pipe(

  //   );
  // }

  createItem(itemDetails, image){
    const formData: any = new FormData();
    formData.append('medicineName', itemDetails.get("medicineName").value);
    formData.append('medicineBrand', itemDetails.get("medicineBrand").value);
    formData.append('medicineQuantity', itemDetails.get("medicineQuantity").value);
    formData.append('price', itemDetails.get("price").value)
    formData.append("picByte", image);
    const req = new HttpRequest('POST', `${this.baseURL}/item`, formData, {
        reportProgress: true,
        responseType: 'json',
      });

      return this.http.request(req);
  }


  // updateItem(itemId, itemDetails){
  //   const itemForm = {
  //     medicineName: itemDetails.get("medicineName").value,
  //     medicineBrand: itemDetails.get("medicineBrand").value,
  //     medicineQuantity: itemDetails.get("medicineQuantity").value,
  //     price: itemDetails.get("price").value,
  //   };
  //   return this.http.request('PUT', `${this.baseURL}/item/${itemId}`, {
  //     body: itemForm,
  //   }).pipe(

  //   );
  // }

  updateItem(itemId, itemDetails, image){
    const formData: any = new FormData();
    formData.append('medicineName', itemDetails.get("medicineName").value);
    formData.append('medicineBrand', itemDetails.get("medicineBrand").value);
    formData.append('medicineQuantity', itemDetails.get("medicineQuantity").value);
    formData.append('price', itemDetails.get("price").value)
    formData.append("picByte", image);
    const req = new HttpRequest('PUT', `${this.baseURL}/item/${itemId}`, formData, {
        reportProgress: true,
        responseType: 'json',
      });

      return this.http.request(req);
  }




  getAllItems(){
    return this.http.get(`${this.baseURL}/items`);
  }

  searchItems(searchForm){//itemCatagory, itemCourse, itemType
    let medicineName=searchForm.controls["medicineName"].value;
    let medicineBrand = searchForm.controls["medicineBrand"].value;
    return this.http.get(`${this.baseURL}/items/filter?medicineName=${medicineName}&medicineBrand=${medicineBrand}`);
  }

  deleteItems(id){
    return this.http.request('DELETE', `${this.baseURL}/item/${id}`);
  }
}
