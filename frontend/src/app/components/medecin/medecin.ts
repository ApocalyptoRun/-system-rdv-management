import { Component, OnInit } from '@angular/core';
import { MedecinService } from '../../services/medecin'; // Vérifie bien le chemin vers ton service

@Component({
  selector: 'app-medecin',
  standalone: false,
  templateUrl: './medecin.html',
  styleUrl: './medecin.css',
})
export class Medecin implements OnInit {
  // Liste qui stockera les médecins venant du backend
  listeMedecins: any[] = [];
  chargement: boolean = true;

  constructor(private medecinService: MedecinService) {}

  // Cette méthode s'exécute dès que le composant s'affiche
  ngOnInit(): void {
    this.chargerDonnees();
  }

  chargerDonnees() {
    this.chargement = true;
    this.medecinService.getMedecins().subscribe({
      next: (data) => {
        console.log(data)
        this.listeMedecins = data;
        this.chargement = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des médecins', err);
        this.chargement = false;
      }
    });
  }

  // supprimerMedecin(id: number) {
  //   if (confirm('Voulez-vous vraiment supprimer ce médecin ?')) {
  //     this.medecinService.deleteMedecin(id).subscribe(() => {
  //       // On rafraîchit la liste après suppression
  //       this.chargerDonnees();
  //     });
  //   }
  // }
}