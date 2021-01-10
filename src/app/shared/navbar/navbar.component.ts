import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  /**for profile name */
  profileName : string;

  @Input() title: string;
  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.profileName = localStorage.getItem('userName');
  }

  menuClick() {
    // document.getElementById('main-panel').style.marginRight = '260px';
   }
   
   logout(){
    console.log("Logout");
    
    this.authenticationService.logout();
        this.router.navigate(['/']);
  }
}
