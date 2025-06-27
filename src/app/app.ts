import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GoalsManagementWidget} from './features/goals/goals-management-widget/goals-management-widget.component';
import {BoardsManagementWidget} from './features/boards/boards-management-widget/boards-management-widget';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GoalsManagementWidget, GoalsManagementWidget, BoardsManagementWidget],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'untitled';
}
