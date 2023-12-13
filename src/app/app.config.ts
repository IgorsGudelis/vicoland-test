import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { CustomRouterStateSerializer } from '@core/utils';
import { environment } from '@environment/environment';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { routerFeatureKey } from '@shared/store/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore({
      [routerFeatureKey]: routerReducer,
    }),
    provideEffects(),
    provideRouterStore({
      serializer: CustomRouterStateSerializer,
    }),
    environment.providers,
  ],
};
