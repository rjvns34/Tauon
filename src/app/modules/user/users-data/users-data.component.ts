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
import { Router } from '@angular/router';
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
              private alertService: AlertService,
              private router: Router) { }

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
      
      installationName: ['', Validators.required],
      roomName: ['', Validators.required],
      
      endPoint1:['',Validators.required], type1:['', Validators.required],
      
      endPoint2:['',Validators.required], type2:['', Validators.required],
      
      endPoint3:['',Validators.required], type3:['', Validators.required],
      
      endPoint4:['',Validators.required], type4:['', Validators.required],
    
    })

  }

  private loadAllUsers(){
    this.userService.getAllUser().pipe(first())
    .subscribe(users => {
      this.userData = users["result"];
      // this.totalRecords = users;
      // console.log(users)
    });
  }

  getUserInfo(data){
    // console.log(data);
    
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
    // console.log('Submit');    
    // console.log(data);
    
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

      // console.log('update');
      // console.log(data);
      this.userId
      
      this.userService.updateUser(data).pipe(first()).subscribe(data => {
        // console.log(data);
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
        // console.log(data.userId);
        this.userService.deleteUser(data.userId).pipe(first()).subscribe(() => {
          this.loadAllUsers();
          alert("User deleted");
          
        });
      }
  }
  get mf(){return this.macIdForm.controls; }
  macIdFormSubmit(){
    this.submitted =true;
    // console.log(this.mf.macId);
    
    if(this.macIdForm.valid){
      this.loading = true;
    
    this.nodeService.getMasterId(this.mf.macId.value).pipe(first()).subscribe(masterIds => {
      
      let invalidIds = masterIds[1]["invalid_node_list"];

      if (invalidIds.length > 0 ) {
        Swal.fire('Wrong!', 'Mac-Id ', 'error');
     // this.alertService.error('something went wrong please try again', true)
      } else {
        // console.log(masterIds[0]["masterIds"][0]["masterId"]);
        this.masterId = masterIds[0]["masterIds"][0]["masterId"];
        // console.warn(this.masterId);
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
    
  } 
  // get if(){return this.installationForm.controls}
  installationFormSubmit(data){
    // console.log("installationFormSubmit" +this.uId + this.masterId + this.endPointId1 + this.endPointId2 + this.endPointId3 + this.endPointId4);
    
    this.submitted =true;
    // console.log(this.installationForm.valid);
    // console.log(data);
    
    
    if(this.installationForm.valid){
      this.loading = true;
    // console.log(data);
    this.nodeService.submitInstallationInfo(data,this.uId, this.masterId , this.endPointId1 , this.endPointId2 , this.endPointId3 , this.endPointId4).pipe(first())
    .subscribe(response => {
      // console.log(response["result"]);
      
      if(response["result"] === "duplicate master id"){
        Swal.fire('Already installed', 'This node is Already installed', 'error');
      }
      else{
        Swal.fire('Installation', 'Successfull', 'success');
        this.macIdForm.reset();
        this.installationForm.reset();
  
        $("#installationForm").modal('hide');
        $("#macIdModel").modal('hide');
      }
    },
    error => {
      this.loading = false;
      // console.log(error);
      
    })
    }

    
  }

  count = 0;
  uId:any;
  onCheckboxChange(e:boolean, userId:any) {
  
  if(e === true){
    // console.log("true");
    // console.log(userId);
    this.uId = userId;
    this.count ++;
  }
  else if(e === false){
    this.count --;
  }
  // console.log(this.count);
  // if(this.count > 1){
  //   document.getElementById('bottomBtnDiv').style.display="none";
  // }
  if(this.count === 1){
    document.getElementById('bottomBtnDiv').style.display="block";
  }
  else{
    document.getElementById('bottomBtnDiv').style.display="none";
  }
}

totalInfo(userId){
  // console.log(userId);
  // window.location.href = "dashboard/userTotalInfo";
  // window.location.assign("dashboard/userTotalInfo  ");
  return this.userService.userTotalDetails(userId)
  .pipe(first())
  .subscribe(userData => {
    // console.log(userData);
    // console.log(userData["user_info"]);
  
    const installationInfo = userData["user_info"]
    // console.log(installationInfo);
    
    if(installationInfo.length > 1){
      this.router.navigateByUrl('/dashboard/userTotalInfo',{ state: userData }); //send data to user-total-info component
    }
    else{
      Swal.fire('Error', 'Installation is not done yet', 'error');
    } 
  });
}
}
