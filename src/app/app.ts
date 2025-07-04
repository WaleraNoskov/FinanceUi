import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {BoardStore} from './features/boards/board-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconButton, MatIcon, MatToolbar, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'untitled';

  constructor(boardStore: BoardStore) {
    boardStore.loadBoards().then()
  }
}
