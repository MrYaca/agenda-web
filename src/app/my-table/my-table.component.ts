import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit {
  dataSource = new PersonDataSource(this.personService);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'lastname', 'nick'];

  constructor(private personService: PersonService) {
    this.personService.getConfig().subscribe(config => {
      console.log(config);
    });

    // this.personService.getPersons().subscribe(persons => {
    //   console.log(persons);
    // });
  }

  ngOnInit() {}
}

export class PersonDataSource extends DataSource<any> {
  constructor(private personService: PersonService) {
    super();
  }

  connect(): Observable<any> {
    return this.personService.getPersons();
  }

  disconnect() {}
}
