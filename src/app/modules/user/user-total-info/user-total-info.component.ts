import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-total-info',
  templateUrl: './user-total-info.component.html',
  styleUrls: ['./user-total-info.component.css']
})
export class UserTotalInfoComponent implements OnInit {
  userData: User[] = [];
  constructor( private router: Router) { }

  ngOnInit(): void {
    this.userData = history.state.user_info[1]["installations"] //get data from user-data-component L:323

    // this.router.getCurrentNavigation().extras.state
    // console.log(history.state.user_info[1])
    
    // window.addEventListener("keyup", disableF5);
    //  window.addEventListener("keydown", disableF5);
    // console.log(this.userData);
  //   function disableF5(e) {
  //     if ((e.which || e.keyCode) == 116) e.preventDefault(); 
  //     if ((e.which || e.keyCode) == 82) e.preventDefault(); 
      
  //     // evt.button == 2
  //     // keycode == 82
  //  };
  }

}
