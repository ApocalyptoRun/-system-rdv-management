import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Patient {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api';

  
  getMesRendezVous(): Observable<any[]> {
    const patientId = localStorage.getItem('user_id_parent');
    return this.http.get<any[]>(`${this.apiUrl}/rendezvous/?patient=${patientId}`);
  }

  annulerRendezVous(rdvId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/rendezvous/${rdvId}/`);
  }
}