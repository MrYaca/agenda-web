import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewFormComponent {
  personForm = this.fb.group({
    name: [null, Validators.required],
    lastname: [null, Validators.required],
    email: [null, [Validators.email, Validators.required]],
    phone: [null, Validators.required],
    nick: [null],
    avatar: [null]
  });

  constructor(
    private fb: FormBuilder,
    private personService: PersonService
  ) {}

  onSubmit() {
    console.log(this.personForm.value);
    this.personService
      .addPerson(this.personForm.value)
      .subscribe(
        response => {
          console.log('OK: ', response);
        },
        error => {
          console.log('ERROR: ', error);
        }
      );
  }
}
