import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(private http: HttpClient) {}

  private configUrl = 'assets/config.json';
  private apiUrl =
    'https://agenda-api-yfx.now.sh/api/Persons';

  getConfig() {
    return this.http.get(this.configUrl);
  }

  getPersons() {
    return this.http.get(this.apiUrl);
  }

  addPerson(person) {
    return this.http.post(this.apiUrl, person);
  }

  updatePerson(person) {
    return this.http.put(
      this.apiUrl + '/' + person.id,
      person
    );
  }

  deletePerson(personId) {
    return this.http.delete(this.apiUrl + '/' + personId);
  }
}
