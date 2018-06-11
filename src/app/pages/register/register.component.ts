import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email: string;
  public password: string;
  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmitAddUser(){
    this.authService.register(this.email, this.password)
    .then( (res) => {
      this.flashMessage.show('The user was created succesfully',
      {cssClass: 'alert-success', timeout: 3500});
      this.router.navigate(['/chart']);
    }).catch ( (err) => {
      this.flashMessage.show(err.message,
      {cssClass: 'alert-danger', timeout: 3500});
      this.router.navigate(['/register']);
    })
  }

}
