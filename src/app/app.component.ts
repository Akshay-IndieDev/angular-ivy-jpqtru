import { Component, VERSION } from '@angular/core';
import UsersJson from '../assets/users.json';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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
  value = '';
  userAddressValidations: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.userAddressValidations = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z]+'),
        ],
      ],
    });
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
}
