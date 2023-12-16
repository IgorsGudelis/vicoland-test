import { Validators } from '@angular/forms';

export const ADDRESS_VALIDATOR = Validators.pattern("[a-zA-Z -']+");
export const LETTERS_VALIDATOR = Validators.pattern("[a-zA-Z']+");
export const NUMBERS_VALIDATOR = Validators.pattern('[0-9]*');
