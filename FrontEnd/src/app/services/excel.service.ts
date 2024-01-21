import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) {}

  // Export method
  exportTasksToExcel(){
    return this.http.get(environment.apiUrl + 'export');
  }

}
