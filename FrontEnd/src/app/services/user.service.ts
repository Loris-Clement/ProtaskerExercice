import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  //Get methods
  //Get All
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + '/Users');
  }
}
