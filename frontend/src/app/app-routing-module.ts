import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Medecin } from './components/medecin/medecin';
import { PatientComponent } from './components/patient/patient';
import { authGuard } from './guards/auth.guard';
import { AuthComponent } from './components/auth/auth';
import { NavBar } from './components/nav-bar/nav-bar';

export const routes: Routes = [
  
  // 1. Les routes spécifiques d'abord
  { path: 'auth', component: AuthComponent },
  { path: 'navbar', component: NavBar },
  { 
    path: 'medecins', 
    component: Medecin, 
    canActivate: [authGuard], 
    data: { role: 'ADMIN' } 
  },
  { 
    path: 'patients', 
    component: PatientComponent, 
    canActivate: [authGuard], 
    data: { role: 'PATIENT' } 
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  // 2. Le joker (Wildcard) TOUJOURS en dernier
  { path: '**', redirectTo: 'auth' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
