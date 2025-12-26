import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MedecinService } from '../../services/medecin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medecin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medecin.html',
  styleUrl: './medecin.css',
})
export class Medecin implements OnInit {
  listeMedecins: any[] = [];
  chargement: boolean = false;

  currentMedecin: any = {};

  isEditMode: boolean = false;

  constructor(private medecinService: MedecinService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.chargerDonnees();
  }

  chargerDonnees() {
    this.chargement = true;
    this.medecinService.getMedecins().subscribe({
      next: (data) => {
        console.log(data);
        this.listeMedecins = data;
        this.chargement = false;
        this.cdr.detectChanges();
      },
      error: () => {this.chargement = false, this.cdr.detectChanges();}
    });
  }

  prepareAjout() {
    this.isEditMode = false;
    console.log("Préparer ajout: ", this.isEditMode);
    this.currentMedecin = { username: '', email: '', password: '', specialite: '' };
  }

  prepareEdit(m: any) {
    this.isEditMode = true;
    this.currentMedecin = JSON.parse(JSON.stringify(m));
  }

  enregistrer() {
    if (this.isEditMode) {
      console.log("Mode édition activé");
      this.medecinService.updateMedecin(this.currentMedecin).subscribe(() => {
        this.chargerDonnees();
        this.closeModal();

        Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Médecin modifier avec succès',
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
      });
    } else {
      this.medecinService.addMedecin(this.currentMedecin).subscribe(() => {
        this.chargerDonnees();
        this.closeModal();

        Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Médecin enregistré avec succès',
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
      });
    }
  }


  supprimer(id: number) {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: "Cette action est irréversible !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6', // Bleu primaire
    cancelButtonColor: '#d33',    // Rouge danger
    confirmButtonText: 'Oui, supprimer !',
    cancelButtonText: 'Annuler',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // 2. Appel au service seulement si l'utilisateur confirme
      this.medecinService.deleteMedecin(id).subscribe({
        next: () => {
          this.chargerDonnees();
          Swal.fire(
            'Supprimé !',
            'Le médecin a été retiré de la liste.',
            'success'
          );
        },
        error: () => {
          Swal.fire(
            'Erreur',
            'Impossible de supprimer ce médecin.',
            'error'
          );
        }
      });
    }
  });
}

  private closeModal() {
    const closeBtn = document.getElementById('closeModalBtn');
    closeBtn?.click();
  }
}