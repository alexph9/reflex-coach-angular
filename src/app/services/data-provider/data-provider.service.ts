import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';


@Injectable()

export class DataProviderService {
  users: Observable<User[]>;
  user: Observable<User>;
  public id: string;
  usersRef: AngularFireList<User>
  userRef: AngularFireObject<User>

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list<User>('users');
    this.users = db.list<User>('users').valueChanges();
  }

  addNewUser(idUser: string, user: User){
    this.id = idUser;
    this.usersRef.set(idUser, user);
  }

  getAllUsers():Observable<User[]>{
    return this.users = this.usersRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.val() as User;
        const id = a.key;
        return { id, ...data };
      }))
    );
  }

  getOneUser(idUser: string){
    this.userRef = this.db.object<User>(`users/${idUser}`);
    this.user = this.userRef.snapshotChanges().pipe(
      map(action => {
          const data = action.payload.val() as User;
          data.id = action.key;
          return  data ;
      })
    );
    return this.user;
  }
  updateUser(user: User){
    this.userRef = this.db.object(`users/${user.id}`);
    this.userRef.update(user);
  }
  deleteUser(user: User){
    this.userRef = this.db.object(`users/${user.id}`);
    this.userRef.remove();
  }
}


