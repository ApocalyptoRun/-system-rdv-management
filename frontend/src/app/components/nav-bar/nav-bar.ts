import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
username: string | null = '';
  role: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Récupération des infos stockées lors du login
    this.username = localStorage.getItem('username');
    this.role = localStorage.getItem('role');
  }

  onLogout(): void {
    Swal.fire({
      title: 'Déconnexion ?',
      text: "Voulez-vous vraiment quitter votre session ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Oui, déconnexion',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout(); // Supprime le token et redirige vers /auth
      }
    });
  }
}
