import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game';
import { Firestore, collection, doc, onSnapshot, collectionData, addDoc, Unsubscribe } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);
  id!: string;

  constructor(private router: Router) { }

  async newGame() {
    let game = new Game();
    await this.addGame(game.toJson())
      .then(() => {
        if (this.id) {
          this.router.navigateByUrl('/game/' + this.id);
        } else {
          console.error('Fehler: ID konnte nicht generiert werden.');
        }
      })
      .catch((err) => {
        console.error('Fehler beim Starten des Spiels:', err);
      });
  }

  async addGame(item: {}) {
    await addDoc(this.getGameRef(), item).then(
      (gameInfo) => { this.id = gameInfo?.id; }
    ).catch(
      (err) => {
        console.error(err);
      }
    );
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }
}