import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Punition } from 'src/app/shared/models/punition.model';
import { AbsenceService } from 'src/app/shared/services/absence.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { PunitionService } from 'src/app/shared/services/punition.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
import { SessionScolaireService } from 'src/app/shared/services/session-scolaire.service';
@Component({
  selector: 'app-modifier-punition',
  templateUrl: './modifier-punition.component.html',
  styleUrls: ['./modifier-punition.component.css']
})
export class ModifierPunitionComponent implements OnInit {

  id!: number;
  data!: any;
  @ViewChild('modifierPunitionForm') modifierPunitionForm!: NgForm
  @ViewChild('box1') box1!: NgModel

  showMsg: boolean = false
  MsgError: boolean = false
  listEleves: any;
  groupe_id!: number
  groupes: any;
  punition: any
  punitionEleve = new Punition()
  enseignant_id!: number
  listSeances!: any
  annee_id!:number
  sessions:any
  constructor(private authService: AuthService, private route: ActivatedRoute, private ps: PunitionService, private gs: GroupeService, private as: AbsenceService,public anneeService: AnneeScolaireService,private sessionService:SessionScolaireService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.enseignant_id = this.authService.getEnseignantId()
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.getPunitionById()
    this.listGroupes()
    this.listeSessions()


  }

  getPunitionById() {
    this.ps.getPunitionById(this.id,this.annee_id).subscribe(res => {
      console.log(res);
      this.punition = res
      this.listEleveByGroupeId(this.punition.eleve.groupes[0].id)
      this.seances()

    })
  }
  listeSessions(){
    this.sessionService.getSessions(this.annee_id).subscribe(res=>{
      console.log(res);
      this.sessions=res;
    })
  }
  listGroupes() {
    this.gs.listGroupe(this.enseignant_id,this.annee_id).subscribe(res => {
      this.groupes = res;
      console.log(this.groupes);
    })
  }

  onSelect() {
    this.groupe_id = this.punition.eleve.groupe_id
    console.log("groupe_id:", this.groupe_id)
    this.listEleveByGroupeId(this.groupe_id);
    this.punition.eleve_id = 0

  }

  listEleveByGroupeId(groupeId: number) {
    this.gs.listEleveByGroupeId(groupeId).subscribe(res => {
      this.listEleves = res;
      console.log(this.listEleves);
    })
  }

  seances() {
    this.as.ListSeancesByGroupeId(this.punition.eleve.groupes[0].id, this.enseignant_id).subscribe(res => {
      this.listSeances = res;
      console.log("seances: ", this.listSeances);

    })
  }


  selectedValue: boolean = false;
  selected(_event: any) {
    if (_event.target.value == 'Exclusion hors de la classe') {
      this.selectedValue = true
    } else {
      this.selectedValue = false

    }
    console.log("x: ", this.selectedValue)
    console.log(_event.target.value)
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  modifierPunition() {
    if (!this.modifierPunitionForm.form.valid || this.box1.invalid || this.punition.eleve_id == 0 && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
      this.punitionEleve = this.punition
      this.ps.modifierPunition(this.id, this.punitionEleve).subscribe(res => {
        this.modifierPunitionForm.resetForm();
        this.punition.eleve_id = 0
        this.MsgError = false
        this.showMsg = true;
        this.selectedValue = false;

        setTimeout(() => {
          this.showMsg = false;
        }, 2000)
      })
    }

  }

}
