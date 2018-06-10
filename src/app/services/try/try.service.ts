import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Try } from '../../models/try';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from '../../models/user';

@Injectable()

export class TryService {
  attempCollection: AngularFirestoreCollection<Try>;
  attempDocument: AngularFirestoreDocument<Try>;
  tries: Observable<Try[]>;
  attemp: Observable<Try>;

  constructor(private firestone: AngularFirestore) {
    this.attempCollection = this.firestone.collection<Try>('tries');
  }

  addNewTry(attemp :Try){
    this.attempCollection.add(attemp);
  }

  getOneTry(idTry: string){
    this.attempDocument = this.firestone.doc<Try>(`tries/${idTry}`);
    this.attemp = this.attempDocument.snapshotChanges().pipe(
      map(action => {
        if(action.payload.exists === false){
          return null;
        }else{
          const data = action.payload.data() as Try;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.attemp;
  }

  getAllTrysForAnUser(userId: string){
    this.attempDocument = this.firestone.doc<Try>(`tries/${userId}`);
  }

  updateTry(attemp: Try){
    this.attempDocument = this.firestone.doc(`tries/${attemp.id}`);
    this.attempDocument.update(attemp);
  }
  deleteTry(attemp: Try){
    this.attempDocument = this.firestone.doc(`tries/${attemp.id}`);
    this.attempDocument.delete();
  }
}
