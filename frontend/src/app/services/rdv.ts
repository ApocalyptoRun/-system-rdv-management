import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RdvService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Récupérer les créneaux DISPONIBLES d'un médecin précis
  getCreneauxDisponibles(medecinId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/creneaux/?medecin_id=${medecinId}&dispo=true`);
  }

  // Créer le rendez-vous (C'est ici que le créneau sera verrouillé côté Backend)
  reserver(rdvData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rendezvous/`, rdvData);
  }
}