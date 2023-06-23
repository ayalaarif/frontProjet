import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursGroupes } from 'src/app/shared/models/cours-groupes.model';
import { CoursService } from 'src/app/shared/services/cours.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';


@Component({
  selector: 'app-affecter-groupes-cours',
  templateUrl: './affecter-groupes-cours.component.html',
  styleUrls: ['./affecter-groupes-cours.component.css']
})
export class AffecterGroupesCoursComponent implements OnInit {
  coursId!: number
  id!: number;
  user: any;
  groupe: any;
  showMsg: boolean=false
  MsgError: boolean=false
  @ViewChild('CoursGroupesForm') CoursGroupesForm!: NgForm;
  CoursGroupes: any
  annee_id!:number
 

  constructor(private route: ActivatedRoute, private cs: CoursService, private gs: GroupeService, private authService: AuthService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.coursId = this.route.snapshot.params['id'];

    this.id = this.authService.getEnseignantId()
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.listGroupes();
    this.getCoursGroupes();

  }

  //Retourne les groupes  et les niveaux assigner à chaque groupe d'un enseignant specifique 
  listGroupes() {
    this.gs.listGroupe(this.id,this.annee_id).subscribe(res => {
      this.groupe = res;
      console.log(this.groupe);

    })
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  data = new CoursGroupes()

  //Remplir le table pivot cours_groupes 
  addCoursGroupes() {
    if (!this.CoursGroupesForm.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
      this.data.cours_id = this.coursId;
      this.cs.addCoursGroupes(this.data).subscribe(res => {
        console.warn(res);
        this.CoursGroupesForm.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
  
      })

    }

  }

  //Retourne la liste des groupes affectée à un cours spécifique
  getCoursGroupes() {
    this.cs.listCoursGroupes(this.coursId,this.annee_id).subscribe(res => {
      this.CoursGroupes = res;
      console.warn(this.CoursGroupes);

    })

  }

  //Recherche si le groupeId existe dans la liste des groupes d'un cours qqconque
  exist(groupeId: number) {

    return this.CoursGroupes.groupes.some((g: any) => (g.id === groupeId))
  }

}
