import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Observable, of } from 'rxjs';

import { User } from '../models';

@Injectable()
export class UsersService {
  createUser(): Observable<User> {
    return of(this.generateUser());
  }

  getUsers(): Observable<User[]> {
    return of(Array.from(new Array(15)).map(() => this.generateUser()));
  }

  private generateUser(): User {
    const { image, internet, location, person } = faker;
    const firstName = person.firstName();
    const lastName = person.lastName();

    return {
      avatarUrl: image.avatar(),
      city: location.city(),
      country: location.country(),
      email: internet.email({ firstName, lastName }),
      firstName,
      id: new Date().getMilliseconds(),
      lastName,
      street: location.street(),
      zipcode: location.zipCode(),
    };
  }
}
