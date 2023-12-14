import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';

import { User } from '../models';

@Injectable()
export class UsersService {
  getUsers(): User[] {
    return Array.from(new Array(15)).map(() => this.getUser());
  }

  getUser(): User {
    const { image, internet, location, person } = faker;
    const firstName = person.firstName();
    const lastName = person.lastName();

    return {
      avatarUrl: image.avatar(),
      city: location.city(),
      country: location.country(),
      email: internet.email({ firstName, lastName }),
      firstName,
      lastName,
      street: location.street(),
      zipcode: location.zipCode(),
    };
  }
}
