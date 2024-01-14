import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../models/Task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  //get method
  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>()
  }
}
