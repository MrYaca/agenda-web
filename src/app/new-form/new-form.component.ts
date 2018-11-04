import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewFormComponent implements OnInit {
  isNewPerson = true;

  personForm = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    lastname: [null, Validators.required],
    email: [null, [Validators.email, Validators.required]],
    phone: [null, Validators.required],
    nick: [null],
    avatar: [null]
  });

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const personToUpdate = JSON.parse(
      localStorage.getItem('person')
    );
    console.log(personToUpdate);

    if (personToUpdate !== null) {
      this.isNewPerson = false;
      this.personForm.setValue(personToUpdate);
      localStorage.clear();
    }
  }

  onSubmit() {
    console.log(this.personForm.value);
    if (this.isNewPerson) {
      this.personService
        .addPerson(this.personForm.value)
        .subscribe(
          response => {
            console.log('OK: ', response);
            this.personForm.reset();
          },
          error => {
            console.log('ERROR: ', error);
          }
        );
    } else {
      this.personService
        .updatePerson(this.personForm.value)
        .subscribe(
          response => {
            console.log('OK: ', response);
            this.personForm.reset();
            this.router.navigate(['/lista']);
          },
          error => {
            console.log('ERROR: ', error);
          }
        );
    }
  }
}
