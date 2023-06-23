import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExamenGroupe } from 'src/app/shared/models/examen-groupe.model';
import { ExamenService } from 'src/app/shared/services/examen.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';

@Component({
  selector: 'app-affecter-groupe',
  templateUrl: './affecter-groupe.component.html',
  styleUrls: ['./affecter-groupe.component.css']
})
export class AffecterGroupeComponent implements OnInit {
  showMsg: boolean=false
  MsgError: boolean=false
  @ViewChild('ExamenGroupeForm') ExamenGroupeForm!: NgForm;

  groupe: any;
  id!: number;
  user: any;
  examenId!: number;
  examenGroupe: any
  annee_id!:number
 


  constructor(private route: ActivatedRoute, private gs: GroupeService, private es: ExamenService, private authService: AuthService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.examenId = this.route.snapshot.params['id'];

    this.id = this.authService.getEnseignantId()
    console.log('EnseignantId' + this.id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    this.listGroupes();
    this.getExamenGroupes();

  }

  //Retourne un enseignant spécifique avec son compte (user) ainsi que ces groupes et les niveaux assigner à chaque groupe
  listGroupes() {
    this.gs.listGroupe(this.id,this.annee_id).subscribe(res => {
      this.groupe = res;
      console.log('listGroupes' + res)
      console.log(this.groupe);

    })
  }

  //Retourne un examen spécifique avec ses groupes 
  getExamenGroupes() {
    this.es.listExamenGroupes(this.examenId,this.annee_id).subscribe(res => {
      this.examenGroupe = res;
      console.warn('examenGroupes' + this.examenGroupe);

    })

  }    

  //Recherche si le groupeId existe dans la liste des groupes d'un examen qqconque
  exist(groupeId: number) {

    return this.examenGroupe.some((g: any) => (g.id === groupeId))
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  data = new ExamenGroupe();

  //Remplir le table pivot examen_groupes 
  addGroupeExamen() {
    if (!this.ExamenGroupeForm.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true
    } else {
      this.data.examen_id = this.examenId;
      this.es.addGroupeExamen(this.data).subscribe(res => {
        console.warn(res);
        this.ExamenGroupeForm.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
  
      })
    }
  }

  
}
