import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { User } from '../../models/user';

@Injectable()

export class UserService {
  usersList: AngularFireList<any>;
  public selectedUser: User = new User(); 

  constructor(private db: AngularFireDatabase) {
   }

   createUserObject($key, email) {
    let user: User = {
      $key,
      email,
    }
    this.createUser(user);
   }

   createUser(user: User){
     console.log(this.usersList)
     this.usersList.push(user);
   }

   updateUserEmail(user: User){
     this.usersList.update(user.$key, {
       email: user.email
     });
   }

   getUserList(){
     return this.usersList = this.db.list('users');
   }

   deleteUser($key: string){
     this.usersList.remove($key);
   }

}


