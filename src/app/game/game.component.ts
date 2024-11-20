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
import { Firestore, collection, doc, onSnapshot, collectionData, addDoc, Unsubscribe, updateDoc } from '@angular/fire/firestore';
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
  game!: Game;
  gameId!: string;
  readonly dialog = inject(MatDialog);
  unsubSingleGame!: Unsubscribe;

  constructor(private route: ActivatedRoute) {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.unsubSingleGame = this.subSingleGame();
    })
  }


  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGameRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  subSingleGame() {
    return onSnapshot(this.getSingleGameRef("games", this.gameId), (element) => {
      console.log(element.data());
      let game = element.data();
      if (game) {
        this.game.currentPlayer = game['currentPlayer'];
        this.game.playedCards = game['playedCards'];
        this.game.players = game['players'];
        this.game.stack = game['stack'];
        this.game.pickCardAnimation = game['pickCardAnimation'];
        this.game.currentCard = game['currentCard'];
      }
    });
  }

  ngOnDestroy() {
    this.unsubSingleGame();
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        if (this.game.currentCard) this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false, 1000;
        this.saveGame();
      }, 1000);
    }
  }

  newGame() {
    this.game = new Game;
  }

  async saveGame() {
    await updateDoc(this.getSingleGameRef("games", this.gameId), this.game.toJson()).catch(
      (err) => { console.log(err); }
    ).then(
      (error) => { console.log(error); }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }
}
