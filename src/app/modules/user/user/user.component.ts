import { Component, OnInit } from '@angular/core';
// import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  users: User[] = [];
  
  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router,
              ) { }

  ngOnInit(): void {
    // this.loadAllUsers();
  }

  // private loadAllUsers(){
  //   this.userService.getAllUser().pipe(first()).subscribe(users => {
  //     this.users = users;
  //     console.log(users);
  //   });
  // }

  
}
