import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  readonly dialog = inject(MatDialog);
  name: string = '';
  

  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  onNoClick() {
    this.dialogRef.close();
  }

}
