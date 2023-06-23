import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Groupe } from 'src/app/shared/models/groupe.model';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { NiveauService } from 'src/app/shared/services/niveau.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';

@Component({
  selector: 'app-ajouter-groupe',
  templateUrl: './ajouter-groupe.component.html',
  styleUrls: ['./ajouter-groupe.component.css']
})
export class AjouterGroupeComponent implements OnInit {
  annee_id=0
  showMsg: boolean=false
  MsgError: boolean=false
  niveaux: any;
  groupe = new Groupe();
  @ViewChild('groupeform') groupeform!: NgForm;

  constructor(private groupeService: GroupeService, private niveauService: NiveauService,public anneeService: AnneeScolaireService) { }


  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.groupe.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.groupe.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    console.log('anneeID'+this.groupe.annee_id)
    this.listNiveau();
    // this.groupe.niveau_id = 0
  }

  

  listNiveau() {
    this.niveauService.getNiveau().subscribe(res => {
      console.log(res);
      this.niveaux = res;
    })
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }


  ajouterGroupe() {
    if (!this.groupeform.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
      console.log('a'+this.groupe.annee_id)
      console.log(this.groupe)
      this.groupeService.ajouterGroupe(this.groupe).subscribe(res => {
        console.warn(res);
        this.groupeform.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
  
      })
    }
  }

}
