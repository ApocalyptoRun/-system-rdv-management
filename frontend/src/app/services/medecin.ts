import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  // L'URL de ton API Django
  private apiUrl = 'http://127.0.0.1:8000/api/medecins/';

  constructor(private http: HttpClient) { }

  // 1. Récupérer la liste des médecins
  getMedecins(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 2. Ajouter un nouveau médecin
  addMedecin(medecinData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, medecinData);
  }

  // 3. Supprimer un médecin
  deleteMedecin(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}