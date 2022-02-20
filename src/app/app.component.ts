import { Component, VERSION, ViewChild, ElementRef } from '@angular/core';
import { MatTable } from '@angular/material/table';
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
  id: Number;
  first_name: String;
  last_name: String;
  email: String;
  gender: String;
}

const Users: USERS[] = [
  {
    id: 1,
    first_name: 'Jeanette',
    last_name: 'Penddreth',
    email: 'jpenddreth0@census.gov',
    gender: 'Female',
  },
  {
    id: 2,
    first_name: 'Giavani',
    last_name: 'Frediani',
    email: 'gfrediani1@senate.gov',
    gender: 'Male',
  },
  {
    id: 3,
    first_name: 'Noell',
    last_name: 'Bea',
    email: 'nbea2@imageshack.us',
    gender: 'Female',
  },
  {
    id: 4,
    first_name: 'Willard',
    last_name: 'Valek',
    email: 'wvalek3@vk.com',
    gender: 'Male',
  },
];
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('table', { static: false }) table: MatTable<any>;
  @ViewChild('filter', { static: false }) filter: ElementRef;

  name = 'Angular ' + VERSION.major;
  value = '';

  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'email',
    'gender',
  ];
  dataSource = Users;

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
