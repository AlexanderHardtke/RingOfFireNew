import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { GameInfoComponent } from "../game-info/game-info.component";
import { Firestore, collection, doc, onSnapshot, collectionData, addDoc, Unsubscribe } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { list } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  firestore: Firestore = inject(Firestore);
  pickCardAnimation: boolean = false;
  currentCard: string | undefined = '';
  game!: Game;
  readonly dialog = inject(MatDialog);
  unsubSingleGame!: Unsubscribe;

  constructor(private route: ActivatedRoute) {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.unsubSingleGame = this.subSingleGame(params['id']);
    })
  }



  async addGame(item: {}) {
    await addDoc(this.getGameRef(), item).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => { console.log("Document written with ID: ", docRef?.id); }
    );
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGameRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  // subGames() {
  //   return onSnapshot(this.getGameRef(), (games) => {
  //     games.forEach(game => {
  //       console.log("Game update ", game);
  //     });
  //   });
  // }

  subSingleGame(gameId: string) {
    return onSnapshot(this.getSingleGameRef("games", gameId), (element) => {
      console.log(element.data());
      let game = element.data();
      if (game) {
        this.game.currentPlayer = game['currentPlayer'];
        this.game.playedCards = game['playedCards'];
        this.game.players = game['players'];
        this.game.stack = game['stack'];
      }
    });
  }

  ngOnDestroy() {
    this.unsubSingleGame();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        if (this.currentCard) this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false, 1000
      }, 1000);
    }
  }

  newGame() {
    this.game = new Game;
    // this.addGame(this.game.toJson());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
