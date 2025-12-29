import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';

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

    // Exemple de logique dans ton service Angular
  getOrGenerateCreneaux(medecinId: number, date: string) {
    // 1. On cherche les créneaux
    return this.http.get<any[]>(`${this.apiUrl}/creneaux/?medecin_id=${medecinId}&date=${date}`).pipe(
      switchMap(creneaux => {
        if (creneaux.length === 0) {
          // 2. Si rien, on demande au serveur de les générer
          return this.http.post<any[]>(`${this.apiUrl}/creneaux/generer/`, { medecin_id: medecinId, date: date });
        }
        return of(creneaux);
      })
    );
  }

  // Dans ton service rdv.ts
  getAvailableSlots(medecinId: number, date: string): Observable<any[]> {
    // On passe medecin_id et date à l'API Django
    return this.http.get<any[]>(`${this.apiUrl}/creneaux/?medecin_id=${medecinId}&date=${date}`);
  }

  getSlots(medecinId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rendezvous/?medecin_id=${medecinId}`);
  }

  deleteRdv(rdvId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/rendezvous/${rdvId}/`);
  }

}