import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../models/Task";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  //getAll method
  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.apiUrl + 'Tasks');
  }
}
