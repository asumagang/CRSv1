import { Component } from '@angular/core';
import { User, Role } from './_models';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRSv1';

  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

  get isPDPO(){
    return this.currentUser && this.currentUser.role === Role.PDPO;
  }

  get isBoth(){
    return this.currentUser && this.currentUser.role === Role.PDPO || Role.Admin;
   
   
  }
}
