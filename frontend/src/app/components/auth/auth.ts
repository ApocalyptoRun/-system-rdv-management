import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthComponent {
  isLoginMode = true;
  showPassword = false;

  // Variables temporaires pour capturer le nom complet
  tempFname = '';
  tempLname = '';
  
  loginData = { email: '', password: '' };
  
  // Ajout du champ role avec une valeur par défaut
  registerData = { 
    username: '', 
    email: '', 
    password: '', 
    role: 'PATIENT' 
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.authService.login(this.loginData).subscribe({
        next: (res) => {
          // Swal.fire('Succès', 'Bienvenue !', 'success');
          const role = localStorage.getItem('role')
          if(role) this.redirectUser(role);
          
        },
        error: (err) => Swal.fire('Erreur', 'Identifiants invalides', 'error')
      });
    } else {
      // Construction du username : "Prénom Nom"
      this.registerData.username = `${this.tempFname} ${this.tempLname}`.trim();

      // Utilisation d'une méthode générique register si elle existe 
      // ou maintien de registerPatient selon ton service
      this.authService.registerPatient(this.registerData).subscribe({
        next: () => {
          Swal.fire('Compte créé', 'Vous pouvez maintenant vous connecter', 'success');
          this.isLoginMode = true;
        },
        error: (err) => Swal.fire('Erreur', 'Données invalides ou utilisateur déjà existant', 'error')
      });
    }
  }

  private redirectUser(role: string) {
    // Vérifie que les strings correspondent exactement à ce que renvoie Django (souvent en majuscules)
    if (role === 'PATIENT') this.router.navigate(['/patients']);
    else if (role === 'MEDECIN') this.router.navigate(['/medecins']);
    else this.router.navigate(['/auth']);
  }

  
}