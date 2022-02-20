import { Component, VERSION } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pipe, PipeTransform } from '@angular/core';
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

export interface USERSTITLE {
  id: Number;
  first_name: String;
  gender: String;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  value = '';

  handleInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'email',
    'gender',
  ];
  dataSource = new MatTableDataSource<USERS>(Users);

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

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      var dataa = Users_Title.filter((element) => element.id == data.id);
      return (
        data.id.toString().toLowerCase().includes(filter) ||
        data.gender.toString().toLowerCase().includes(filter) ||
        data.id.toString().toLowerCase() === filter ||
        dataa[0].first_name
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase())
      );
    };
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
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

const Users_Title: USERSTITLE[] = [
  {
    id: 1,
    first_name: 'Jeanette',
    gender: 'Female',
  },
  {
    id: 2,
    first_name: 'Giavani',
    gender: 'Male',
  },
  {
    id: 3,
    first_name: 'Noell',
    gender: 'Female',
  },
  {
    id: 4,
    first_name: 'Willard',
    gender: 'Male',
  },
];

@Pipe({
  name: 'FilterData',
})
export class OrdinalPipe implements PipeTransform {
  transform(value: Number): String {
    var data = Users_Title.filter((element) => element.id === value);
    return data[0].first_name;
  }
}
