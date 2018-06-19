import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DataProviderService } from '../../services/data-provider/data-provider.service';

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
    public dataProviderService: DataProviderService,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  user = {
    id: '',
    email: '',
    games: [{}],
  }

  userRegistered: boolean = false;

  onSubmitAddUser() {
    this.authService.register(this.email, this.password)
      .then((res) => {
        if (!this.userRegistered) { this.registerUserDB(); }

        this.flashMessage.show('The user was created succesfully',
          { cssClass: 'alert-success', timeout: 3500 });
        this.router.navigate(['/games']);
      }).catch((err) => {
        this.flashMessage.show(err.message,
          { cssClass: 'alert-danger', timeout: 3500 });
        this.router.navigate(['/register']);
      })
  }

  registerUserDB() {
    if (!this.userRegistered) {
      this.authService.getAuth().subscribe(user => {
        this.user.id = user.uid;
        this.user.email = user.email;
        this.dataProviderService.addNewUser(this.user.id, this.user);
        this.userRegistered = true;
      })
    }
  }
}
