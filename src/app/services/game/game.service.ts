import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Game } from '../../models/game';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from '../../models/user';

@Injectable()

export class GameService {
  gameCollection: AngularFirestoreCollection<Game>;
  gameDocument: AngularFirestoreDocument<Game>;
  games: Observable<Game[]>;
  game: Observable<Game>;

  constructor(private firestone: AngularFirestore) {
    this.gameCollection = this.firestone.collection<Game>('games');
  }

  addNewGame(game: Game){
    
  }

  getAllGamesForUser():Observable<Game[]>{
    return this.games = this.gameCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Game;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getOneGame(idGame: string){
    this.gameDocument = this.firestone.doc<Game>(`games/${idGame}`);
    this.game = this.gameDocument.snapshotChanges().pipe(
      map(action => {
        if(action.payload.exists === false){
          return null;
        }else{
          const data = action.payload.data() as Game;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.game;
  }

  getAllGamesForAnUser(userId: string){
    this.gameDocument = this.firestone.doc<Game>(`games/${userId}`);
  }

  updateGame(game: Game){
    this.gameDocument = this.firestone.doc(`games/${game.id}`);
    this.gameDocument.update(game);
  }
  deleteGame(game: Game){
    this.gameDocument = this.firestone.doc(`games/${game.id}`);
    this.gameDocument.delete();
  }
}
