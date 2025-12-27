import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app-routing-module';  
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './app/interceptors/jwt-interceptor';

bootstrapApplication(App, {
  providers: [provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtInterceptor]) // Ton intercepteur JWT ici
    ),
  ],
}).catch(err => console.error(err));
