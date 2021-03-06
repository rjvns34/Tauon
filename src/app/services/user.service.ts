import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { RequiredData } from '../helpers/requiredData';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

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

  updateUser(userId,emailId,firstname,lastname,mobile_no,address){
   
    const body={
      "firstname":firstname,
      "lastname":lastname,
      "mobile_no":mobile_no,
      "address":address,
      "email":emailId
    }    
    const headers = {'Authorization':RequiredData.authorization}
    const updateUrl =RequiredData.baseUrl+'update/user/'+userId
    return this.http.put(updateUrl, body, {headers}).pipe(map(data => {
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
    const headers = {'Authorization':RequiredData.authorization}
    return this.http.get<User[]>(RequiredData.baseUrl+'get/userinfo/'+userId,{headers})
    .pipe(map(userData => {
      // console.log(userData);
      return userData
    }))
  }
}
