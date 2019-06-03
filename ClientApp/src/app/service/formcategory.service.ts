import { Injectable } from '@angular/core';

import { CreateformComponent } from '../form/createform/createform.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormcategoryService {

  constructor(private http:HttpClient) { }
  post(formData: any)
  {
    return this.http.post("https://localhost:44306/api/FormCategories", formData);
  }
}
