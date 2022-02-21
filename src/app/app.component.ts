import { Component, VERSION } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface USERS {
  id: Number;
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
  value = '';
  filterValues: any = {};
  isMale = false;
  isFemale = false;
  mInput = false;
  fInput = false;
  firstName: String;
  lastName: String;
  email: String;
  gender: String;

  handleInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }

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
      lastName: ['', []],
      gender: ['', []],
      email: ['', [Validators.required, Validators.email]],
    });

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      var dataa = Users.filter((element) => element.id == data.id);
      return (
        data.email.toString().toLowerCase().includes(filter) ||
        dataa[0].first_name
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        dataa[0].last_name
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        data.gender.toString().toLowerCase() === filter
      );
    };
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isMaleChecked(value) {
    const filterValue = value ? 'Male' : null;
    this.isMale = value;
    console.log('Male: ' + this.isMale);
    this.ifBothChecked()
      ? this.resetFilters()
      : this.applyGenderFilter(filterValue);
  }

  isFemaleChecked(value) {
    const filterValue = value ? 'Female' : null;
    this.isFemale = value;
    console.log('Female: ' + this.isFemale);
    this.ifBothChecked()
      ? this.resetFilters()
      : this.applyGenderFilter(filterValue);
  }

  resetFilters() {
    this.dataSource.filter = '';
  }

  ifBothChecked(): boolean {
    //Identify which checkbox is checked
    if (this.isMale && this.isFemale) return true;
    else return false;
  }

  applyGenderFilter(value) {
    if (null != value) this.dataSource.filter = value.trim().toLowerCase();
    else this.resetFilters();
  }

  addUser() {
    this.firstName = this.userAddressValidations.get('firstName')?.value;
    this.lastName = this.userAddressValidations.get('lastName')?.value;
    this.email = this.userAddressValidations.get('email')?.value;
    this.gender = this.userAddressValidations.get('gender')?.value;

    if ('' != this.firstName && '' != this.email && '' != this.gender) {
      const newId = this.dataSource.data.length + 1;
      //Add data to a temp. const vaariable
      const record = this.dataSource.data;
      record.push(
        this.createInputData(
          newId,
          this.firstName,
          this.lastName,
          this.email,
          this.gender
        )
      );
      this.dataSource.data = record;
    } else {
    }
  }

  createInputData(id, firstname, lastname, email, gender): USERS {
    return {
      id: id,
      first_name: firstname,
      last_name: lastname,
      email: email,
      gender: gender,
    };
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
  {
    id: 5,
    first_name: 'Thomas',
    last_name: 'Burke',
    email: 'tbburke@census.gov',
    gender: 'Male',
  },
  {
    id: 6,
    first_name: 'Stephie',
    last_name: 'Simpson',
    email: 'ssimpson@senate.gov',
    gender: 'Female',
  },
  {
    id: 7,
    first_name: 'Natalie',
    last_name: 'Evans',
    email: 'nevans98@imageshack.us',
    gender: 'Female',
  },
  {
    id: 8,
    first_name: 'William',
    last_name: 'Zhang',
    email: 'wzhang3@vk.com',
    gender: 'Male',
  },
];

@Pipe({
  name: 'FilterData',
})
export class OrdinalPipe implements PipeTransform {
  transform(value: Number): String {
    var data = Users.filter((user) => user.id === value);
    return data[0].first_name;
  }
}
