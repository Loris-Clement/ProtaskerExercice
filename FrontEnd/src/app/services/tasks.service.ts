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

  //get methods
  //Get all
  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.apiUrl + 'Tasks');
  }
  //Get by id
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(environment.apiUrl + `Tasks/${id}`)
  }

  //Post method
  addTask(task: Task) {
    return this.http.post(environment.apiUrl + 'Tasks', task);
  }
}
