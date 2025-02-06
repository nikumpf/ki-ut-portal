import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//import type { Schema } from '../amplify/data/resource';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
const client = generateClient<Schema>();

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ki-ut-portal';
}
