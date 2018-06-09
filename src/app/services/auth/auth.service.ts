import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from '../user/user.service';
import { User } from '../../models/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor( 
    public afAuth: AngularFireAuth, 
    private router: Router,
    public afDatabase: AngularFireDatabase,
    private userService: UserService,
  ) {
   }
  
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( (userData) => {
        resolve(userData);
        this.registerUserDB(email)
      },
      err => reject(err));
    });
  }

  registerUserDB(email){
    // let usersList = this.userService.getUserList();
    // console.log(usersList);
    // console.log(email);
    // let id 
    // id = this.obtainNewId(usersList[usersList.length-1].$key);
    // this.userService.createUserObject(id, email);
    
    /*this.userService.createUserObject("00002", email);*/
  }

  obtainNewId(lastId){
    for(var i = lastId.length - 1 ; i >= 0; i-- ){
      if(lastId[i] === '4'){
        lastId[i] = '0';
      } else {
        lastId[i] = (parseInt(lastId[i]) + 1).toString;
        console.log(lastId);
        return lastId;
      }
      return "55555";
    }
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
 