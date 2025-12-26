import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Medecin } from './components/medecin/medecin';
import { PatientComponent } from './components/patient/patient';

export const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'medecins', component: Medecin },
  { path: 'patients', component: PatientComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
