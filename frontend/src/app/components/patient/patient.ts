import { ChangeDetectorRef, inject, Component, OnInit } from '@angular/core';
import { MedecinService } from '../../services/medecin';
import { RdvService } from '../../services/rdv';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Patient } from '../../services/patient';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './patient.html',
  styleUrls: ['./patient.css']
})
export class PatientComponent implements OnInit {
  private patientService = inject(Patient);
  rdvForm: FormGroup;
  medecins: any[] = [];
  creneaux: any[] = [];
  medecinSelectionne: any = null;

  mesRdv: any[] = [];

  constructor(private medecinService: MedecinService,
    private rdvService: RdvService,
    private cdr: ChangeDetectorRef, 
    private fb: FormBuilder) {
        this.rdvForm = this.fb.group({
        medecinId: ['', Validators.required],
        date: ['', Validators.required],
        creneauId: ['', Validators.required],
        urgent: [false],
        motif: ['']
    });
    }

  ngOnInit() {
    this.medecinService.getMedecins().subscribe(data => {
      // console.log(data);
      this.medecins = data;
      this.cdr.detectChanges();
    });

    this.chargerMesRdv();
  }

 onParamsChange() {
  const { medecinId, date } = this.rdvForm.value;

  // On ne lance la recherche que si les deux champs sont remplis
    if (medecinId && date) {
      this.rdvService.getAvailableSlots(medecinId, date).subscribe({
        next: (data) => {
          this.creneaux = data; // Stocke les créneaux reçus (ton JSON)
          this.rdvForm.get('creneauId')?.setValue(''); // Réinitialise le choix si on change de date
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erreur chargement créneaux', err);
          this.creneaux = [];
        }
      });
    }
  }

  onSubmit() {
    if (this.rdvForm.invalid) return;

    const payload = {
      patient: localStorage.getItem('user_id_parent'), // Ton ID patient
      creneau: this.rdvForm.value.creneauId,
      urgent: this.rdvForm.value.urgent,
      motif: this.rdvForm.value.motif
    };

    this.rdvService.reserver(payload).subscribe({
      next: () => {
       alert('Rendez-vous enregistré !')
       this.chargerMesRdv();
      },
      error: (err) => alert('Erreur : ' + err.error.non_field_errors || 'Vérifiez le créneau')
    });
  }

  chargerMesRdv() {
    this.rdvService.getSlots(this.rdvForm.value.medecinId).subscribe({
        next: (data) => {
          console.log("mes rdvs", data);
          this.mesRdv = data; // Stocke les créneaux reçus (ton JSON)
          // this.rdvForm.get('creneauId')?.setValue(''); // Réinitialise le choix si on change de date
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erreur chargement créneaux', err);
          this.creneaux = [];
        }
      });
    this.cdr.detectChanges();
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
    this.rdvService.deleteRdv(id).subscribe({
      next: () => {
        Swal.fire('Succès', 'Rendez-vous annulé !', 'success');
        this.chargerMesRdv(); // Rafraîchir la liste des RDV
      },
      error: (err) => Swal.fire('Erreur', 'Impossible d\'annuler le rendez-vous', 'error')
    });
  }

  
}