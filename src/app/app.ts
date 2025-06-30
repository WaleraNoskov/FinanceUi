import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GoalsManagementWidget} from './features/goals/goals-management-widget/goals-management-widget.component';
import {BoardsManagementWidget} from './features/boards/boards-management-widget/boards-management-widget';
import {SelectBoardWidget} from './features/boards/select-board-widget/select-board-widget';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GoalsManagementWidget, GoalsManagementWidget, BoardsManagementWidget, SelectBoardWidget],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'untitled';
}
