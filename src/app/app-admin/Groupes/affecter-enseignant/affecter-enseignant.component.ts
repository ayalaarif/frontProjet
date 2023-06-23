import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { NiveauService } from 'src/app/shared/services/niveau.service';
import { GroupeEnseignants } from 'src/app/shared/models/groupe-enseignants.model';
@Component({
  selector: 'app-affecter-enseignant',
  templateUrl: './affecter-enseignant.component.html',
  styleUrls: ['./affecter-enseignant.component.css']
})
export class AffecterEnseignantComponent implements OnInit {
  groupe: any
  matieres: any
  data: any
  id!: number
  @ViewChild('enseignantForm') niveauform!: NgForm;
  showMsg: boolean=false
  MsgError: boolean=false
  //  GroupeEnseignants=new GroupeEnseignants()
  GroupeEnseignants: GroupeEnseignants = {
    groupe_id: 0,
    enseignants: [{
      enseignant_id: 0
    }]
  }
  constructor(private route: ActivatedRoute, private groupeService: GroupeService, private niveauService: NiveauService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id'])
    this.id = this.route.snapshot.params['id']
    this.getGroupeByID()

  }
  getGroupeByID() {
    this.groupeService.afficherMatiereEnseignant(this.id).subscribe(res => {
      console.log(res)
      this.data = res
      this.groupe = this.data
      // console.log('enseignants'+res.enseignants)

      this.matieres = this.groupe.niveau.matieres
      this.GroupeEnseignants.groupe_id = this.id
      for (var i = 0; i < this.matieres.length - 1; i++) {
        this.GroupeEnseignants.enseignants.push({
          enseignant_id: 0,
        });
      }

    })
  }

  exist(matiereId: number) {

    return this.groupe.enseignants.some((e: any) => (e.matiere_id === matiereId))
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }


  affecterEnseignants() {
    if (!this.niveauform.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
      this.groupeService.affecterEnseignants(this.GroupeEnseignants).subscribe(res => {
        console.warn(res);
        this.niveauform.resetForm();
        for (var i = 0; i < this.GroupeEnseignants.enseignants.length; i++) {
          this.GroupeEnseignants.enseignants[i].enseignant_id = 0
        }
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
  
      })
    }
  }


}
