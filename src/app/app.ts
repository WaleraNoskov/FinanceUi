import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GoalsComponent} from './features/goals/goals-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GoalsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'untitled';
}
