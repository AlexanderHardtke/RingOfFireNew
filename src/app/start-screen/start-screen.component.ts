import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private router: Router) { }

  newGame() {
    /**
     * starts the game
     */
    let game = new Game();
    this.addGame(this.game.toJson());
    this.router.navigateByUrl('/game');
  }
}