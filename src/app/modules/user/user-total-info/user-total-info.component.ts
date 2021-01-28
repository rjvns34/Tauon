import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Installation } from 'src/app/models/installation';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-total-info',
  templateUrl: './user-total-info.component.html',
  styleUrls: ['./user-total-info.component.css']
})
export class UserTotalInfoComponent implements OnInit {
  userData: User[] = [];
  userInfo;
  users : Array<User>=[];
  userId = localStorage.getItem('userIdForGetData');

  // installationData: MatTableDataSource<Installation>

  constructor( private router: Router, private userService: UserService) { }

  ngOnInit(): void {  
    /**Call function when page load */
    this.getUsersTotalInfo(this.userId);
  }


  getUsersTotalInfo(userId){    
    return this.userService.userTotalDetails(userId)
    .pipe(first()).subscribe(data => {
      console.log(data);
      const installationDetails = data["user_info"][1]["installations"]
      // console.log(data["user_info"][1]["installations"]);
      this.userData = installationDetails;
    })
  }

  onBack(){
    localStorage.removeItem('userIdForGetData');
    this.router.navigateByUrl('/dashboard/userInfo');
  }
}
