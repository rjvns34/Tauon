import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';
import { from } from 'rxjs';
import { Node } from '../../../models/node';
import { NodeService } from 'src/app/services/node.service';
declare var $: any;

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
  showMacIdModel = false;
  btnAction: string;
  userId: string;

  /** for form field */
  fName:string; lName:string; uName:string; emailId:string; mno:string; addr:string; role:string;

  checked = false;

  /** Node Form */
  macIdForm:FormGroup;
  masterId : any;
  endPointId1 : any;
  endPointId2 : any;
  endPointId3 : any;
  endPointId4 : any;

  /**Installation Form */
  installationForm:FormGroup;

  constructor(private userService: UserService,
              private nodeService: NodeService,
              private formBuilder: FormBuilder, 
              private alertService: AlertService) { }

  ngOnInit(): void {
  
    this.loadAllUsers();
    document.getElementById('userId').style.display="block";
    document.getElementById('bottomBtnDiv').style.display="none";

    this.userForm = this.formBuilder.group({
      firstname :['', Validators.required,Validators.minLength(2)],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', ],//Validators.required
      mobile_no: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', ],//Validators.required
      userId: ['', ]//Validators.required
    })

    this.macIdForm = this.formBuilder.group({
      macId: ['',Validators.required]
    })

    this.installationForm = this.formBuilder.group({
      masterId:[], userId:[],
      installationName: ['', Validators.required],
      roomName: ['', Validators.required],
      
      endPointId1:[], endPoint1:['',Validators.required], type1:['', Validators.required],
      
      endPointId2:[], endPoint2:['',Validators.required], type2:['', Validators.required],
      
      endPointId3:[], endPoint3:['',Validators.required], type3:['', Validators.required],
      
      endPointId4:[], endPoint4:['',Validators.required], type4:['', Validators.required],
    
    })

  }

  private loadAllUsers(){
    this.userService.getAllUser().pipe(first())
    .subscribe(users => {
      this.userData = users["result"];
      // this.totalRecords = users;
      console.log(users)
    });
  }

  getUserInfo(data){
    console.log(data);
    
    if(data === 'addUser')
    {
      document.getElementById('passwordDiv').style.display="block";
      document.getElementById('roleDiv').style.display="block";
      this.userForm.reset();
      this.btnAction = 'Submit';
      this.modalTitle = 'Add user';
    }
    else{
      // document.getElementById('passwordDiv').style.display="none";
      // document.getElementById('roleDiv').style.display="none";
      // document.getElementById('emailDiv').style.display="none";
      // document.getElementById('uNameDiv').style.display="pointer-events: none;";
      
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
              // this.alertService.success('User Added', true);
              Swal.fire('User Added!', 'Successfull', 'success');
              this.userForm.reset();
              this.loadAllUsers();
              setTimeout(() => {
                this.alertService.clear();
              }, 2000);
              },
              error => {
                // this.alertService.error('something went wrong please try again', true);
                Swal.fire('Error', 'something went wrong please try again', 'error');
                this.loading = false;
              }
            )
    }

    if(this.btnAction === 'Update'){

      console.log('update');
      console.log(data);
      
      this.userService.updateUser(data).pipe(first()).subscribe(data => {
        console.log(data);
        // this.alertService.success('User updated successfull', true)
        Swal.fire('User Update!', 'Successfull', 'success');
        $("#formModal").modal('hide');
        this.loadAllUsers();
        // setTimeout(() => {
        //   // this.alertService.clear();
        // }, 2000);

      },
      error =>{
          // this.alertService.error('something went wrong please try again', true);
          Swal.fire('User Update!', 'something went wrong please try again!', 'warning');
          this.loading = false;
        }
      )
    }
    
  }

  deleteUser(data){
   
      if(confirm("Are you sure to delete: "+data.username)) {
        console.log(data.userId);
        this.userService.deleteUser(data.userId).pipe(first()).subscribe(() => {
          this.loadAllUsers();
          alert("User deleted");
          
        });
      }
  }

  macIdFormSubmit(data){
    this.submitted =true;
    console.log(data.macId);
    
    if(this.macIdForm.invalid){
      return
    }
    this.loading = true;
    
    this.nodeService.getMasterId(data.macId).pipe(first()).subscribe(masterIds => {
      
      let invalidIds = masterIds[1]["invalid_node_list"];

      if (invalidIds.length > 0 ) {
        Swal.fire('Wrong!', 'Mac-Id ', 'error');
     // this.alertService.error('something went wrong please try again', true)
      } else {
        // console.log(masterIds[0]["masterIds"][0]["masterId"]);
        this.masterId = masterIds[0]["masterIds"][0]["masterId"];
        console.warn(this.masterId);
        return this.nodeService.getEndpointId(this.masterId).pipe(first()).subscribe(endPointId => {
          // console.log(endPointId["result"][0]["endpointId"]);
          // this.endPointId = endPointId["result"]
          this.endPointId1 = endPointId["result"][0]["endpointId"]
          this.endPointId2 = endPointId["result"][1]["endpointId"]
          this.endPointId3 = endPointId["result"][2]["endpointId"]
          this.endPointId4 = endPointId["result"][3]["endpointId"]
          // this.macIdForm.reset();
          $("#installationForm").modal('show');
        })
      }
    },error => {
        this.loading = false;
      })
  } 

  installationFormSubmit(data){
    this.submitted =true;
    console.log(data);
    
    if(this.installationForm.invalid){
      return
    }

    this.loading = true;
    console.log(data);
    this.nodeService.submitInstallationInfo(data).pipe(first())
    .subscribe(response => {
      console.log(response);
      
    },
    error => {
      this.loading = false;
    })
  }

  count = 0;
  uId:any;
  onCheckboxChange(e:boolean, userId:any) {
  
  if(e === true){
    console.log("true");
    console.log(userId);
    this.uId = userId;
    this.count ++;
  }
  else if(e === false){
    this.count --;
  }
  console.log(this.count);
  if(this.count > 1){
    document.getElementById('bottomBtnDiv').style.display="none";
  }
  else if(this.count === 1){
    document.getElementById('bottomBtnDiv').style.display="block";
  }
  else{
    document.getElementById('bottomBtnDiv').style.display="none";
  }
}
}
