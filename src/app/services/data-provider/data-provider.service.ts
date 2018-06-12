import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';


@Injectable()

export class DataProviderService {
  users: Observable<any[]>;
  user: Observable<any>;
  public id: string;
  usersRef: AngularFireList<any>
  userRef: AngularFireObject<any>

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list('users');
    this.users = db.list('users').valueChanges();
  }

  addNewUser(idUser: string, user: any){
    this.id = idUser;
    this.usersRef.set(idUser, user);
  }

  getAllUsers():Observable<any[]>{
    return this.users = this.usersRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.val();
        const id = a.key;
        return { id, ...data };
      }))
    );
  }

  getOneUser(idUser: string){
    this.userRef = this.db.object(`users/${idUser}`);
    this.user = this.userRef.snapshotChanges().pipe(
      map(action => {
          const data = action.payload.val();
          data.id = action.key;
          return  data ;
      })
    );
    return this.user;
  }
  updateUser(user: any){
    this.userRef = this.db.object(`users/${user.id}`);
    this.userRef.update(user);
  }
  deleteUser(user: any){
    this.userRef = this.db.object(`users/${user.id}`);
    this.userRef.remove();
  }
}


