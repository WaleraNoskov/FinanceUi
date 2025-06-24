import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Goals} from './features/goals/goals';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Goals],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'untitled';
}
