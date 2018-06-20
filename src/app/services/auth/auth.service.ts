import { DataProviderService } from './../data-provider/data-provider.service';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  user = {
    id: '',
    email: '',
    games: [{}],
  }

  
  users: any[];
  public isUserLogged: boolean = false;

  constructor( 
    public afAuth: AngularFireAuth, 
    private router: Router,
    private dataProviderService: DataProviderService,
  ) {}

  
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( (userData) => {
        resolve(userData);
      },
      err => reject(err));
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then( userData => {
        resolve(userData);
      },
      err => reject(err));
    });
  }

  getAuth() {
    return this.afAuth.authState.pipe(map (auth => auth));
  }

  logout() {
    this.router.navigate(['/']);
    this.isUserLogged = true;
    return this.afAuth.auth.signOut();
  }

  loginGoogle() {
    return this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider)
  }

  loginFacebook() {
    return this.afAuth.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider)
  }

  loginTwitter() {
    return this.afAuth.auth.signInWithPopup( new firebase.auth.TwitterAuthProvider)
  }

}
 