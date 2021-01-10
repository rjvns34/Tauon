import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { RequiredData } from '../helpers/requiredData';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject : BehaviorSubject<User>;
  public currentUser : Observable<User>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
 
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string){
    const headers = {'Authorization':RequiredData.authorization}
    const body = [{ 'username': username, 'password': password}];

    return this.http.post<any>(RequiredData.baseUrl+'check/login/', body, {headers}).pipe(map(user => {
      if(user){
        localStorage.setItem('currentUser',JSON.stringify(user));
        localStorage.setItem('userName',user.username);
        this.currentUserSubject.next(user);
      }
      return user
    }))
  }

  logout() {
    console.log("Logout @ Auth");
    
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

}
