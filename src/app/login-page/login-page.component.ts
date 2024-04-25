import { Component } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private auth:AuthenticationService){}
  Loginbtn(){
    this.auth.Login();
  }
}
