import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.css']
})
export class UsersDataComponent implements OnInit {

  userData: User[] = [];
  /** for Pagination */
  totalRecords : string 
  page: number=1

  /** for search */
  searchUser: string;

  /** for modal */
  modalTitle:string;

  /**for Form */
  userForm: FormGroup;
  submitted = false;
  loading = false;
  btnAction: string;
  userId: string;

  /** for form field */
  fName:string; lName:string; uName:string; emailId:string; mno:string; addr:string; role:string;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder, 
              private alertService: AlertService) { }

  ngOnInit(): void {
  
    this.loadAllUsers();
    document.getElementById('userId').style.display="block";

    this.userForm = this.formBuilder.group({
      firstname :['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', ],//Validators.required
      mobile_no: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', Validators.required],
      userId: ['', ]//Validators.required
    })
  }

  private loadAllUsers(){
    this.userService.getAllUser().pipe(first())
    .subscribe(users => {
      this.userData = users.result;
      // this.totalRecords = users;
      console.log(users)
    });
  }

  getUserInfo(data){
   
    if(data === 'addUser')
    {
      document.getElementById('passwordDiv').style.display="block";
      this.userForm.reset();
      this.btnAction = 'Submit'
      this.modalTitle = 'Add user'
      
      
    }
    else{
      // document.getElementById('passwordDiv').style.display="none";
      this.btnAction = 'Update';
      this.modalTitle = 'Edit User'
      this.fName = data.firstname;
      this.lName = data.lastname;
      this.userId = data.userId;
      this.uName = data.username;
      this.emailId = data.email;
      this.mno = data.mobile_no;
      this.addr = data.address;
      this.role = data.role; 
    }
    
  }

  get f(){return this.userForm.controls; }

  onSubmit(data){
    this.submitted = true;

    if(this.userForm.invalid)
    {
      return
    }
    
    if(this.btnAction === 'Submit'){
    console.log('Submit');    
    console.log(data);
    
    this.userService.addUser(data).pipe(first())
            .subscribe(data => {
              this.alertService.success('User Added', true);
                console.log(data+ "@ user data component");          
              },
              error => {
                this.alertService.error('something went wrong please try again', true);
                this.loading = false;
              }
            )
    }

    if(this.btnAction === 'Update'){

      console.log('update');
      console.log(data);
      
      this.userService.updateUser(data).pipe(first()).subscribe(data => {
        console.log(data);
        this.alertService.success('User updated successfull', true)
      },
      error =>{
          this.alertService.error('something went wrong please try again', true);
          this.loading = false;
        }
      )
    }
    
  }
}
