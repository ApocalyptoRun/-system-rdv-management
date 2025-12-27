import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, credentials).pipe(
      tap((res: any) => {
        const token = res.access;
        localStorage.setItem('token', token);

        const data = this.decodeToken(token);
        if (data) {
          localStorage.setItem('user_id', data.user_id);
          localStorage.setItem('user_id_parent', data.medecin_id || data.patient_id);
          localStorage.setItem('role', data.role);
          localStorage.setItem('username', data.username);
        }
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  registerPatient(data: any): Observable<any> {
    // Envoie vers le ViewSet de tes patients
    return this.http.post(`${this.apiUrl}/patients/`, data);
  }


  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1]; // Récupère la partie centrale
      const decodedJson = atob(payload);   // Décode la base64
      return JSON.parse(decodedJson);      // Convertit en objet JS
    } catch (e) {
      console.error("Erreur de décodage du token", e);
      return null;
    }
  }
}