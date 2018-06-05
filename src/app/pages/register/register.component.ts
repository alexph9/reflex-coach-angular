import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    public router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitAddUser(){
    this.authService.register(this.email, this.password)
    .then( (res) => {
      this.router.navigate(['/chart']);
    }).catch ( (err) => {
      console.log(err);
      this.router.navigate(['/register']);
    })
  }

}
