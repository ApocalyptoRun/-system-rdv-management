import { Component, OnInit } from '@angular/core';
import { MedecinService } from '../../services/medecin';
import { Rdv } from '../../services/rdv'; // À créer
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient.html',
  styleUrl: './patient.css'
})
export class PatientComponent implements OnInit {
  listeMedecins: any[] = [];
  mesRendezVous: any[] = [];
  selectedMedecin: any = null;
  
  // Pour le formulaire de réservation
  nouveauRDV = {
    date: '',
    heure: '',
    motif: '',
    medecin: null
  };

  constructor(
    private medecinService: MedecinService,
    private rdvService: Rdv
  ) {}

  ngOnInit() {
    this.chargerMedecins();
    this.chargerMesRDV();
  }

  chargerMedecins() {
    this.medecinService.getMedecins().subscribe(data => this.listeMedecins = data);
  }

  chargerMesRDV() {
    this.rdvService.getMesRendezVous().subscribe((data: any[]) => this.mesRendezVous = data);
  }

  reserver() {
    this.rdvService.creerRDV(this.nouveauRDV).subscribe({
      next: () => {
        Swal.fire('Succès', 'Rendez-vous réservé !', 'success');
        this.chargerMesRDV();
      },
      error: () => Swal.fire('Erreur', 'Ce créneau est déjà pris', 'error')
    });
  }

  annulerRDV(id: number) {
    Swal.fire({
      title: 'Annuler ce rendez-vous ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rdvService.deleteRDV(id).subscribe(() => this.chargerMesRDV());
      }
    });
  }
}