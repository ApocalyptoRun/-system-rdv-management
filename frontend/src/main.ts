import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app-routing-module';  

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
}).catch(err => console.error(err));
