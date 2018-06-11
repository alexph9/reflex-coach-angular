import { DataProviderService } from './../data-provider/data-provider.service';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { User } from '../../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  user : User = {
    id: '',
    email: '',
  }

  users: User[];
  newId: string;
  userRegistered: boolean = false;

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
        this.registerUserDB(email)
      },
      err => reject(err));
    });
  }

  registerUserDB(email){
    this.dataProviderService.getAllUsers().subscribe(users => {
      this.users = users;
      let maxId : string = '00000';
      for(var i = 0; i < this.users.length - 1; i++){
        if(parseInt(maxId) < parseInt(this.users[i].id) ){
          maxId = this.users[i].id;
        }
      }
      if(!this.userRegistered){
        this.obtainNewId(maxId, email);
      }
    });
    this.userRegistered = false;
  }

 obtainNewId(lastId, email){
  this.user.id = "55555";
  let idAux : any = lastId.split("");
  if(!this.userRegistered){
    for(var i = lastId.length - 1 ; i >= 0; i-- ){
      if(idAux[i] === '4'){
        idAux[i] = '0';
      } else {
        idAux[i] = parseInt(idAux[i]) + 1;
        idAux[i].toString();
        lastId = idAux.join('');
        break;
      }
    }
  }
  this.user.id = lastId;
  this.user.email = email;
  this.dataProviderService.addNewUser(this.user.id, this.user);
  this.userRegistered = true;
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
 