import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { RequiredData } from '../helpers/requiredData';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUser(){
    const headers = {'Authorization':RequiredData.authorization}
    return this.http.get<User[]>(RequiredData.baseUrl+'get/users/', {headers})
    .pipe(map(data => {
      return data
    }))
  }

  addUser(user: User){
    const headers = {'Authorization':RequiredData.authorization}
    return this.http.post<any>(RequiredData.baseUrl+'add/user',[user],{headers})
    .pipe(map(data => {
      console.log("data @ user service" +data);  
    }))
  }

  updateUser(user: User){
    console.log(user.userId);
    
    const headers = {'Authorization':RequiredData.authorization}
    const updateUrl =RequiredData.baseUrl+'update/user/'+user.userId
    return this.http.put<any>(updateUrl, user, {headers}).pipe(map(data => {
      console.log("Update");
    }))
  }
}
