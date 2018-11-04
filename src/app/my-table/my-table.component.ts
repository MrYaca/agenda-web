import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit {
  data = new BehaviorSubject<any[]>([]);
  dataSource = new PersonDataSource(this.data);
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'name',
    'lastname',
    'nick',
    'actions'
  ];

  constructor(private personService: PersonService) {
    this.personService.getConfig().subscribe(config => {
      console.log(config);
    });
    this.personService
      .getPersons()
      .subscribe((persons: any[]) => {
        this.data.next(persons);
      });
  }

  ngOnInit() {}

  delete(person) {
    this.personService.deletePerson(person.id).subscribe(
      response => {
        console.log('OK: ', response);

        // Remove deleted person from the current data collection;
        const tmp = this.data.value.filter(
          p => p.id !== person.id
        );

        // Update data source stream
        this.data.next(tmp);
      },
      error => {
        console.log('ERROR: ', error);
      }
    );
  }
}

export class PersonDataSource extends DataSource<any> {
  data: BehaviorSubject<any>;

  /** Stream of data that is provided to the table. */
  constructor(data: BehaviorSubject<any>) {
    super();
    this.data = data;
  }

  connect(): Observable<any> {
    return this.data;
  }

  disconnect() {}
}
