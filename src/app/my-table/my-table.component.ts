import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonService } from '../services/person.service';
@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit {
  persons = new BehaviorSubject<any[]>([]);
  dataSource = new PersonDataSource(this.persons);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'name',
    'lastname',
    'nick',
    'actions'
  ];

  constructor(
    private personService: PersonService,
    private router: Router
  ) {
    // Load local files
    this.personService.getConfig().subscribe(config => {
      console.log(config);
    });

    this.personService
      .getPersons()
      .subscribe((persons: any[]) => {
        this.persons.next(persons);
      });
  }

  ngOnInit() {}

  update(person) {
    localStorage.setItem('person', JSON.stringify(person));
    this.router.navigate(['/nuevo']);
  }

  delete(person) {
    this.personService.deletePerson(person.id).subscribe(
      response => {
        console.log('OK: ', response);

        // Remove deleted person from the current data collection;
        const tmp = this.persons.value.filter(
          p => p.id !== person.id
        );

        // Update data source stream
        this.persons.next(tmp);
      },
      error => {
        console.log('ERROR: ', error);
      }
    );
  }
}

export class PersonDataSource extends DataSource<any> {
  persons: BehaviorSubject<any>;

  /** Stream of data that is provided to the table. */
  constructor(persons: BehaviorSubject<any>) {
    super();
    this.persons = persons;
  }

  connect(): Observable<any> {
    return this.persons;
  }

  disconnect() {}
}
