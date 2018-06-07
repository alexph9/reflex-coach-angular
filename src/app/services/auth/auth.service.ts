import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    public afAuth: AngularFireAuth, 
    private router: Router,
    public afDatabase: AngularFireDatabase,
  ) {
    this.data = afDatabase.list("users").valueChanges();
    console.log(this.data);
   }

  protected data: Observable<any>;
  protected newId : number;
  
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then( (userData) => {
        resolve(userData);
        this.resolveData();
      },
      err => reject(err));
    });
  }

  getDataFromDatabase(){
    return this.data.pipe(map(res => res));
  }

  resolveData(){
    this.getDataFromDatabase().subscribe(data =>{
      this.newId = parseInt(data[data.length-1].id);
      this.fillId
      

    })
  }

  fillId(num) {
    const fullDigits : number = 5;
    let restDigits : number = fullDigits - num.toString().length;
    var id;
    for(var i = 0; i< restDigits; i++) {
      id += "0";
    }
    id += num.toString();
    return id;
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
 