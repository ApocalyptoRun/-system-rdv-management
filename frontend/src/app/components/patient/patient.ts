import { ChangeDetectorRef, inject, Component, OnInit } from '@angular/core';
import { MedecinService } from '../../services/medecin';
import { RdvService } from '../../services/rdv';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../services/patient';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient.html',
  styleUrls: ['./patient.css']
})
export class PatientComponent implements OnInit {
  private patientService = inject(Patient);
  
  medecins: any[] = [];
  creneaux: any[] = [];
  medecinSelectionne: any = null;

  mesRdv: any[] = [];

  constructor(private medecinService: MedecinService,
    private rdvService: RdvService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.medecinService.getMedecins().subscribe(data => {
      // console.log(data);
      this.medecins = data;
      this.cdr.detectChanges();
    });

    this.chargerMesRdv();
  }

  chargerMesRdv() {
    this.patientService.getMesRendezVous().subscribe(data => this.mesRdv = data);
  }

  choisirMedecin(medecin: any) {
    this.medecinSelectionne = medecin;
    this.rdvService.getCreneauxDisponibles(medecin.id).subscribe(data => {
      this.creneaux = data;
      this.cdr.detectChanges();
    });
  }

  validerRdv(creneauId: number) {
    const rdv = {
      creneau: creneauId,
      patient: localStorage.getItem('user_id_parent'), 
      urgent: false
    };

    this.rdvService.reserver(rdv).subscribe({
      next: () => {
        Swal.fire('Succès', 'Rendez-vous réservé !', 'success');
        this.choisirMedecin(this.medecinSelectionne); // Rafraîchir les créneaux
      },
      error: (err) => Swal.fire('Erreur', 'Ce créneau n\'est plus disponible', 'error')
    });
  }

  annulerRdv(id: number) {
    // Logique Swal.fire puis appel à :
    // this.patientService.annulerRendezVous(id).subscribe(...)
  }
}