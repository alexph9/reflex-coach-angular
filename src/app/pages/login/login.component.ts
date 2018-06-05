import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onClickGoogleBtn(){
    this.authService.loginGoogle()
      .then((res) => {
        this.flashMessage.show('The user was logged in succesfully',
        {cssClass: 'alert-success', timeout: 2500});
        this.router.navigate(['/chart']);
      }).catch ( (err) => {
        console.log(err);
        this.flashMessage.show(err.message,
        {cssClass: 'alert-danger', timeout: 2500});
        this.router.navigate(['/login']);
      })
  }

  onSubmitLogin(){
    this.authService.login(this.email, this.password)
    .then( (res) => {
      this.flashMessage.show('The user was logged in succesfully',
      {cssClass: 'alert-success', timeout: 2500});
      this.router.navigate(['/chart']);
    }).catch ( (err) => {
      console.log(err);
      this.flashMessage.show(err.message,
      {cssClass: 'alert-danger', timeout: 2500});
      this.router.navigate(['/login']);
    })
  }

}
