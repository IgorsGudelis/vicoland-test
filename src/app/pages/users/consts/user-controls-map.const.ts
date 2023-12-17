import { KeyValue } from '@angular/common';

export const USER_CONTROLS_MAP: ({ required?: boolean } & KeyValue<
  string,
  string
>)[] = [
  {
    key: 'firstName',
    required: true,
    value: 'First Name',
  },
  {
    key: 'lastName',
    required: true,
    value: 'Last Name',
  },
  {
    key: 'email',
    required: true,
    value: 'Email',
  },
  {
    key: 'country',
    required: true,
    value: 'Country',
  },
  {
    key: 'city',
    required: true,
    value: 'City',
  },
  {
    key: 'street',
    required: true,
    value: 'Street',
  },
  {
    key: 'zipcode',
    value: 'Zipcode',
  },
];
