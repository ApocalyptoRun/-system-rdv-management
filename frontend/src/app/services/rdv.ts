import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Rdv {
  private apiUrl = 'http://127.0.0.1:8000/api/rendezvous'; // Adaptez selon votre urls.py

  constructor(private http: HttpClient) { }

  // Liste des RDV du patient connecté
  getMesRendezVous(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mes-rdv/`);
  }

  // Réserver un nouveau créneau
  creerRDV(rdvData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, rdvData);
  }

  // Modifier un RDV existant
  modifierRDV(id: number, rdvData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/`, rdvData);
  }

  // Annuler (Supprimer) un RDV
  deleteRDV(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/`);
  }
}