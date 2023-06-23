import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupeService } from 'src/app/shared/services/groupe.service';

@Component({
  selector: 'app-afficher-enseignants',
  templateUrl: './afficher-enseignants.component.html',
  styleUrls: ['./afficher-enseignants.component.css']
})
export class AfficherEnseignantsComponent implements OnInit {
  id!: number
  showMsg: boolean = false;
  data: any
  groupe: any
  data1: any
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(private route: ActivatedRoute, private groupeService: GroupeService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getEnseignants()
    this.data1 = {
      groupe_id: this.id,
      enseignant_id: 0

    }
  }

  getEnseignants() {
    this.groupeService.afficherEnseignants(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.groupe = this.data;

    })
  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idEnseignantGrp!: number;
  onClick(event: number) {
    this.idEnseignantGrp = event
    console.log("idEnseignantGrp:", this.idEnseignantGrp)
  }

  deleteEnseignant(enseignant_id: number) {
    this.data1.enseignant_id = enseignant_id
    this.groupeService.supprimerEnseignant(this.data1).subscribe(res => {
      this.getEnseignants();
      console.log(res);
      this.closeModal.nativeElement.click();
      this.showMsg = true;
      setTimeout(() => {
        this.showMsg = false;
      }, 2000)

    })



  }

}
