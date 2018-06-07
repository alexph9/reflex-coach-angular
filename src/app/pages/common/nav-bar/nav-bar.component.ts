import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isLogin: boolean;
  public username: string;
  public email: string;
  public picture: string;

  constructor(
    public authService: AuthService 
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth =>{
      auth ? this.userLogin(auth) : this.isLogin = false;
    });
  }

  userLogin(auth){
    this.isLogin = true;
    this.username = auth.displayName;
    this.email = auth.email;
    this.picture = auth.photoURL;
  }

  onClickLogout(){
    this.authService.logout();
  }

}
