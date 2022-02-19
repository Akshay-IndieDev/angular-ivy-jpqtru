import { Component, VERSION } from '@angular/core';
import UsersJson from '../assets/users.json';

interface USERS {
  id: number;
  first_name: String;
  last_name: String;
  email: String;
  gender: String;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  Users: USERS[] = UsersJson;
}
