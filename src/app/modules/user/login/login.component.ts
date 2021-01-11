import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from '../../../services/user.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  message:string;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private alertService:AlertService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
  get f(){return this.loginForm.controls;}
  
  onSubmit(){
    this.submitted =true;

    if(this.loginForm.invalid){
      return
    }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe(
        data => {
          if(data.role === "ADMIN"){
            this.router.navigate([this.returnUrl]);
          }
          else{
            this.message = data.result;
            this.alertService.error(this.message,true)
          }

          console.log(data.role);
      },
      error => {
        this.loading = false;
      }
    )
  }

}
