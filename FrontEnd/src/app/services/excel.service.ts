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
    let url = 'Tasks/export'
      if (search != '' || status != -1 || userId != -1){
        url += '?'
        if (search != '') url += `search=${search}&`
        if (status != -1) url += `status=${status}&`
        if (userId !=-1) url += `userId=${userId}&`
        url = url.substring(0, url.length - 1)
      }
    return this.http.get(environment.apiUrl + url);
  }

}
