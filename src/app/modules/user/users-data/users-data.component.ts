import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';
import { from } from 'rxjs';
import { Node } from '../../../models/node';
import { NodeService } from 'src/app/services/node.service';
import { Router } from '@angular/router';
declare var $: any;
import { Chart } from 'node_modules/chart.js'

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

    this.getNodeDetails();
    
    document.getElementById('bottomBtnDiv').style.display="none";

    /** Normal declaration of textboxes */
    this.userForm = this.formBuilder.group({
      firstname :[''], lastname: [''], mobile_no: [''], address: [''], 
      username: [''], email: [''], password: [''], role: ['']
    })

    /**Validation for macId form */
    this.macIdForm = this.formBuilder.group({
      macId: ['',Validators.required]
    })

    /** Validation for Installation form */
    this.installationForm = this.formBuilder.group({
      
      installationName: ['', Validators.required],
      roomName: ['', Validators.required],
      
      endPoint1:['',Validators.required], type1:['', Validators.required],
      
      endPoint2:['',Validators.required], type2:['', Validators.required],
      
      endPoint3:['',Validators.required], type3:['', Validators.required],
      
      endPoint4:['',Validators.required], type4:['', Validators.required],
    
    })

  }
  
  /**  get all user's details*/
  private loadAllUsers(){
    this.userService.getAllUser().pipe(first())
    .subscribe(users => {
      this.userData = users["result"];
      // console.log(this.userData);
      
    });
  }

  /** Add user and update user validation for form's text boxes */
  getUserInfo(data,title){
   
    /** pass two var from button click  data and title data means table's paticular row and title means 
     * what we want to do
     */

    if(title === 'addUser') //if title is addUser that's mean user want to a create new user.
    {
      this.userForm.reset();
      document.getElementById('passwordDiv').style.display="block";
      document.getElementById('roleDiv').style.display="block";
      this.btnAction = 'Submit';
      this.modalTitle = 'Add user';
      /**
       * Validations for add new users 
       */
      
      this.userForm = this.formBuilder.group({
        firstname : new FormControl('', [ Validators.required]),
        lastname: new FormControl('', [ Validators.required]),
        mobile_no: new FormControl('', [ Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
        address: new FormControl('', [ Validators.required]),
        username: new FormControl('', [ Validators.required]),
        email: new FormControl('', [ Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
        password: new FormControl('', [ Validators.required]),
        role: new FormControl('', [ Validators.required]),
      });
      
    }
    if(title === 'update')//if title is updated that's mean user want to a update existing user.
    {
      document.getElementById('passwordDiv').style.display="none";
      document.getElementById('roleDiv').style.display="none";      
      
      this.btnAction = 'Update';
      this.modalTitle = 'Edit User'
      
      /** value of paticular row is set in variables. */
      this.fName = data.firstname;
      this.lName = data.lastname;
      this.addr = data.address;
      this.mno = data.mobile_no;
      this.userId = data.userId;
      this.uName = data.username;
      this.emailId = data.email;
      this.role = data.role; 

      $('#formModal').modal('show');
       
      /** Insert all the user values in the textbox and 
       * disable some text boxes that will not be updated.
      */
      
       this.userForm = this.formBuilder.group({
        firstname : new FormControl({value:this.fName, disabled:false}),
        lastname: new FormControl({value:this.lName, disabled:false}),
        mobile_no: new FormControl({value:this.mno, disabled:false}),
        address: new FormControl({value:this.addr, disabled:false}),
        username: new FormControl({value:this.uName, disabled: true}),
        email: new FormControl({value:this.emailId, disabled:true}),
        password: [],  
        role: [],
      });
    }
  }

  get f(){return this.userForm.controls; }

  /** function for adduser and update user details. */
  onSubmit(data){
    this.submitted = true;

    if(this.userForm.invalid)
    {
      return
    }
    
    if(this.btnAction === 'Submit')//this condition is used for add user details.
    {      
    this.userService.addUser(data).pipe(first())
            .subscribe(data => {
              Swal.fire('User Added!', 'Successfull', 'success');
              this.userForm.reset();
              this.loadAllUsers();
              $("#formModal").modal('hide');
              },
              error => {
                Swal.fire('Error', 'something went wrong please try again', 'error');
                this.loading = false;
              }
            )
    }

    if(this.btnAction === 'Update')//this condition is used for update user details.
    {
      if(data.firstname === null || data.firstname=== ''){
        data.firstname = this.fName
      }
      if(data.lastname === null || data.lastname=== ''){
        data.lastname = this.lName
      }
      if(data.mobile_no === null || data.mobile_no=== ''){
        data.mobile_no = this.mno
      }
      if(data.address === null || data.address=== ''){
        data.address = this.addr
      }
      this.userService.updateUser(this.userId,this.emailId,data.firstname,data.lastname,data.mobile_no,data.address).pipe(first()).subscribe(data => {
        Swal.fire('User Update!', 'Successfull', 'success');
        $("#formModal").modal('hide');
        this.loadAllUsers();
      },
      error =>{
          Swal.fire('User Update!', 'something went wrong please try again!', 'warning');
          this.loading = false;
        }
      )
    }
    
  }
/** function for delete user details. */
  deleteUser(data){
   
      if(confirm("Are you sure to delete: "+data.username)) {
        this.userService.deleteUser(data.userId).pipe(first()).subscribe(() => {
          this.loadAllUsers();
          alert("User deleted");
          
        });
      }
  }
  
  get mf(){return this.macIdForm.controls; }
/** function for send macId and get masterId and also get endpointIds from masterId */
  macIdFormSubmit(){
    this.submitted =true;    
    if(this.macIdForm.valid){
      this.loading = true;
    
    this.nodeService.getMasterId(this.mf.macId.value).pipe(first()).subscribe(masterIds => {
      
      let invalidIds = masterIds[1]["invalid_node_list"];

      if (invalidIds.length > 0 ) {
        Swal.fire('Wrong!', 'Mac-Id ', 'error');
      } else {
        this.masterId = masterIds[0]["masterIds"][0]["masterId"];
        return this.nodeService.getEndpointId(this.masterId).pipe(first()).subscribe(endPointId => {
    
          this.endPointId1 = endPointId["result"][0]["endpointId"]
          this.endPointId2 = endPointId["result"][1]["endpointId"]
          this.endPointId3 = endPointId["result"][2]["endpointId"]
          this.endPointId4 = endPointId["result"][3]["endpointId"]
      
          $("#installationForm").modal('show');
        })
      }
    },error => {
        this.loading = false;
      })
    }
    
  } 

/** Function for send installation form data   */
  installationFormSubmit(data){
    this.submitted =true;
    
    if(this.installationForm.valid){
      this.loading = true;

    this.nodeService.submitInstallationInfo(data,this.uId, this.masterId , this.endPointId1 , this.endPointId2 , this.endPointId3 , this.endPointId4).pipe(first())
    .subscribe(response => {
      
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
    })
    }

    
  }
/** Here we get the value of table checkbox with the userId.  */
  count = 0;
  uId:any;
  onCheckboxChange(e:boolean, userId:any) {
  
  if(e === true){
    this.uId = userId;
    this.count ++;
    }
    else if(e === false){
      this.count --;
    }
    //Here if checkbox checked more than one hide new installation button.
  if(this.count === 1){
    document.getElementById('bottomBtnDiv').style.display="block";
  }
  else{
    document.getElementById('bottomBtnDiv').style.display="none";
  }
}

/** Get total details of users through userId. */
totalInfo(userId){
  localStorage.setItem('userIdForGetData', userId); //we set the userId in session.

  return this.userService.userTotalDetails(userId)
  .pipe(first())
  .subscribe(userData => {

    const installationInfo = userData["user_info"] //only installation details will get here
    
    if(installationInfo.length > 1){ // if installation details is there then redirect to installation details page.

      this.router.navigateByUrl('/dashboard/userTotalInfo');//we just redirect page.
    }
    else{
      Swal.fire('Error', 'Installation is not done yet', 'error');
    } 
  });
}

nodeTimestamp: any[]=[];
nodeTimestampStatus: any[]=[];

getNodeDetails(){
  // return this.nodeService.getNodeDetails().pipe(first()).subscribe(data =>{
    // console.log(data["usersDetails"][0]["timeStamp"]);
    // const timeStamp = data["usersDetails"][0]["timeStamp"];
    
    // for (var val of timeStamp) {
    //   // console.log(val.status); 
    //   this.nodeTimestamp.push(val.timestamp);
    //   this.nodeTimestampStatus.push(val.status)
    // }
    // console.log(this.nodeTimestamp);
    // console.log(this.nodeTimestampStatus);
    
  //   var nodeChart = new Chart("nodeChart", {
  //     type: 'line',
  //     data: {
  //         labels: this.nodeTimestamp,
  //         datasets: [{
  //             label: 'Node Status Chart',
  //             fill: false,
  //             steppedLine: true,
  //             // data: [1,2,3,4,5],
  //             data: this.nodeTimestampStatus,
  //             backgroundColor: [
  //                 'rgba(255, 99, 132, 0.2)'
  //             ],
  //             borderColor: [
  //                  'rgba(255, 99, 132, 1)'
  //             ],
  //             borderWidth: 2,
              
               
            
  //         }]
  //     },
  //     options: {
  //         scales: {
  //             xAxes: [{
  //               type:'time',
  //                 ticks: {
  //                     beginAtZero: true
  //                 }
  //             }]
  //         }
  //     }
  // });
//   })
}

}
