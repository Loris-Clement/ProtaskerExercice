import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) {}

  // Export method
  exportTasksToExcel(search: string, status: number, userId: number){
    return this.http.get(environment.apiUrl + 'Tasks/export', search, status, userId);
  }

}
