import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()

export class DataProviderService {
  userCollection: AngularFirestoreCollection<User>;
  userDocument: AngularFirestoreDocument<User>;
  users: Observable<User[]>;
  user: Observable<User>;

  constructor(private firestone: AngularFirestore) {
    this.userCollection = this.firestone.collection<User>('users');
  }

  addNewUser(user: User){
    this.userCollection.add(user);
  }

  getAllUsers():Observable<User[]>{
    return this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getOneUser(idUser: string){
    this.userDocument = this.firestone.doc<User>(`users/${idUser}`);
    this.user = this.userDocument.snapshotChanges().pipe(
      map(action => {
        if(action.payload.exists === false){
          return null;
        }else{
          const data = action.payload.data() as User;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.user;
  }
  updateUser(user: User){
    this.userDocument = this.firestone.doc(`users/${user.id}`);
    this.userDocument.update(user);
  }
  deleteUser(user: User){
    this.userDocument = this.firestone.doc(`users/${user.id}`);
    this.userDocument.delete();
  }
}


