import { ApplicationConfig } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { CustomRouterStateSerializer } from '@core/utils';
import { environment } from '@environment/environment';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { APP_FORM_FILED_DEFAULT_OPTIONS } from '@shared/consts';
import { CommonEffects } from '@shared/store/common';
import { routerFeatureKey } from '@shared/store/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore({
      [routerFeatureKey]: routerReducer,
    }),
    provideEffects(CommonEffects),
    provideRouterStore({
      serializer: CustomRouterStateSerializer,
    }),
    environment.providers,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: APP_FORM_FILED_DEFAULT_OPTIONS,
    },
  ],
};
