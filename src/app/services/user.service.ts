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
    return this.http.post(RequiredData.baseUrl+'add/user/',[user],{headers})
    .pipe(map(data => {
      console.log("data @ user service" +data);  
    }))
  }

  updateUser(user: User){
    console.log(user);
    
    const headers = {'Authorization':RequiredData.authorization}
    const updateUrl =RequiredData.baseUrl+'update/user/'+user.userId
    return this.http.put(updateUrl, user, {headers}).pipe(map(data => {
      console.log("Update");
    }))
  }

  deleteUser(userId){
    const headers = {'Authorization':RequiredData.authorization}
    return this.http.delete(RequiredData.baseUrl+'delete/user/'+userId,{headers}).pipe(map(data => {
      console.log('delete');
      
    })) 
  }
  
  userTotalDetails(userId){
    console.log(userId);
    const headers = {'Authorization':RequiredData.authorization}
    return this.http.get<User[]>(RequiredData.baseUrl+'get/userinfo/'+userId,{headers})
    .pipe(map(userData => {
      // console.log(userData);
      return userData
    }))
  }
}
