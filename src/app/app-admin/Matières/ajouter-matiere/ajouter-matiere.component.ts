import { Component, OnInit, ViewChild } from '@angular/core';
import { NiveauService } from 'src/app/shared/services/niveau.service';
import { Matiere } from 'src/app/shared/models/matiere.model';
import { NgForm } from '@angular/forms';
import { MatiereService } from 'src/app/shared/services/matiere.service';
import { NiveauMatieres } from 'src/app/shared/models/niveau-matieres.model';

@Component({
  selector: 'app-ajouter-matiere',
  templateUrl: './ajouter-matiere.component.html',
  styleUrls: ['./ajouter-matiere.component.css']
})
export class AjouterMatiereComponent implements OnInit {

  @ViewChild('matiereForm') matiereForm!: NgForm;
  niveaux: any;
  showMsg: boolean=false
  MsgError: boolean=false
  //  Niveau_matieres=new NiveauMatieres<Matiere>()
  Niveau_matieres: NiveauMatieres<Matiere> = {
    niveau_id: 0,
    matieres: [{
      id: 1,
      libelle: "",
      coef:""
    }]
  }

  constructor(private niveauService: NiveauService, private matiereService: MatiereService) { }

  ngOnInit(): void {
    this.listNiveau()
  }
  listNiveau() {
    this.niveauService.getNiveau().subscribe(res => {
      console.log(res)
      this.niveaux = res
    })
  }
  addMatiere() {
    this.Niveau_matieres.matieres.push({
      id: this.Niveau_matieres.matieres.length + 1,
      libelle: '',
      coef:''

    });
    console.log(this.Niveau_matieres.matieres)

  }

  removeMatiere(i: number) {
    this.Niveau_matieres.matieres.splice(i, 1)
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  ajouterMatiereForm() {
    if ((!this.matiereForm.form.valid || this.Niveau_matieres.niveau_id==0) && this.myBtnIdClicked == true) {
      this.MsgError = true
    } else {
      console.log(this.Niveau_matieres)
      this.matiereService.ajouterMatiere(this.Niveau_matieres).subscribe(res => {
        // console.warn(res);
        this.matiereForm.resetForm();
        this.MsgError=false
        // this.Niveau_matieres.niveau_id = 0;
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)

      })
    }
  }

}
